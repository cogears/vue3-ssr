const resolve = require('path').join.bind(null, __dirname, '..')

module.exports.csr = 'dist/csr'
module.exports.ssr = 'dist/ssr'
module.exports.server = 'dist/server'
module.exports.httpProxy = {
    '/api': {
        target: 'http://api.server.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/'
        },
    }
}

module.exports.resolve = function (...paths) {
    return resolve(...paths)
}

module.exports.resolveCSR = function (...paths) {
    return resolve(module.exports.csr, ...paths)
}

module.exports.resolveSSR = function (...paths) {
    return resolve(module.exports.ssr, ...paths)
}

module.exports.resolveServer = function (...paths) {
    return resolve(module.exports.server, ...paths)
}
