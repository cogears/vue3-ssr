const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const config = require('./config')
const serverApi = require('./web-api-server')
const webRenderer = require('./web-renderer')

const server = express()
server.use(require('compression')())
server.use(require('serve-static')(config.resolveCSR(), { index: false }))
server.use(serverApi())
Object.keys(config.httpProxy).forEach(path => {
    server.use(path, createProxyMiddleware(config.httpProxy[path]))
})

server.get('*', webRenderer)

server.listen(process.argv[2] || 80)
console.log(`You can navigate to http://localhost:${process.argv[2] || 80}`)