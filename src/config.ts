const isDev = process.env.NODE_ENV == "development"
const isSSR = (function () {
    try {
        window.document
        return false
    } catch (e) {
        return true
    }
})()

export { isSSR, isDev }

