import { Component, createSSRApp } from 'vue'
import { createMemoryHistory, createRouter, Router, RouteRecordRaw } from 'vue-router'
import Application from './Application'

class ServerApplication extends Application {
    createVueApp(rootComponent: Component) {
        return createSSRApp(rootComponent)
    }

    createRouter(routes: RouteRecordRaw[]): Router {
        const router = createRouter({ routes, history: createMemoryHistory() })
        router.beforeResolve(this.beforeRouterResolve.bind(this))
        return router
    }
}

export default function () {
    return new ServerApplication()
}
