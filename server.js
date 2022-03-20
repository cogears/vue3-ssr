const fs = require('fs')
const resolve = require('path').join.bind(null, __dirname)
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { renderToString } = require('@vue/server-renderer')
const template = fs.readFileSync(resolve('dist/csr/index.html'))
const manifest = require('./dist/ssr/ssr-manifest.json')
const appPath = resolve('dist/ssr', manifest['app.js'])
const createApp = require(appPath).default
const serverRouter = require('./dist/server').default

const server = express()
server.use(require('compression')())
server.use(require('serve-static')(resolve('dist/csr'), { index: false }))
server.use(serverRouter)
// server.use('/api', createProxyMiddleware({ target: 'http://api.server.com', changeOrigin: true }))
server.get('*', async (req, res) => {
    console.info(req.method, req.originalUrl)
    if (!/^\//.test(req.originalUrl)) {
        console.warn('unknow request', req.originalUrl)
        return res.status(404)
    }

    try {
        const { app, router, store } = createApp()
        await router.push(req.originalUrl)
        if (router.currentRoute.value.matched.length > 0) {
            await router.isReady()
            const appContent = await renderToString(app)
            const state = JSON.stringify(store.state)
            const html = template.toString().replace('<div id="app">', `<div id="app">${appContent}<script>window.__ssr_init_state__=${state}</script>`)
            res.setHeader('Content-Type', 'text/html')
            res.send(html)
        } else {
            res.redirect('/')
        }
    } catch (e) {
        console.info('==========error=============')
        console.error(e.stack)
        res.status(500).end(e.message || '500 internal error')
    }
})

server.listen(process.argv[2] || 80)
console.log(`You can navigate to http://localhost:${process.argv[2] || 80}`)