const fs = require('fs')
const { renderToString } = require('@vue/server-renderer')
const config = require('./config')

const template = fs.readFileSync(config.resolveCSR('index.html')).toString()
const manifest = require(config.resolveSSR('ssr-manifest.json'))
const createApp = require(config.resolveSSR(manifest['app.js'])).default

module.exports = async (req, res) => {
    console.info(req.method, req.originalUrl)
    if (!/^\//.test(req.originalUrl)) {
        return res.status(404)
    }

    try {
        const { app, router, store } = createApp()
        await router.push(req.originalUrl)
        if (router.currentRoute.value.matched.length > 0) {
            await router.isReady()
            const appContent = await renderToString(app)
            const state = JSON.stringify(store.state)
            const html = template.replace('<div id="app">', `<div id="app">${appContent}<script>window.__ssr_init_state__=${state}</script>`)
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
}
