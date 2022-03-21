const config = require('./config')
const path = require('path')
const express = require('express')
const router = express.Router()
const SERVER = path.resolve(config.resolveServer())

function loadServer() {
    try {
        return require(config.resolveServer()).default
    } catch (e) {
        console.warn('module reload failed', e);
    }
}

function reloadServer() {
    console.info('file changed, reload...')
    let keys = Object.keys(require.cache)
    for (let k of keys) {
        if (k.startsWith(SERVER)) {
            console.info(k)
            delete require.cache[k]
        }
    }
    const server = loadServer()
    if (server) {
        router.stack.splice(0, router.stack.length)
        router.use(server)
        console.info('web api server loaded.')
    }
}

module.exports = function (dev = false) {
    const serverRouter = loadServer()
    if (dev) {
        let timer = 0
        require('chokidar')
            .watch(config.resolveServer() + '**/*.js')
            .on('change', function () {
                clearTimeout(timer)
                timer = setTimeout(reloadServer, 100);
            })
        if (serverRouter) {
            router.use(serverRouter)
        }
        return router
    }
    return serverRouter || router
}
