import { Component, createSSRApp } from 'vue'
import { createRouter, createWebHistory, RouteLocationNormalized, Router, RouteRecordRaw } from 'vue-router'
import Application from './main'
import './views/styles/base.scss'

class ClientApplication extends Application {
    createVueApp(rootComponent: Component) {
        return createSSRApp(rootComponent)
    }

    createRouter(routes: RouteRecordRaw[]): Router {
        const router = createRouter({
            routes, history: createWebHistory(),
            scrollBehavior(to, from, savedPosition) {
                if (savedPosition) {
                    return savedPosition
                } else {
                    return { left: 0, top: 0 }
                }
            }
        })
        if (process.env.NODE_ENV == "development") {
            router.beforeResolve(this.beforeRouterResolve.bind(this))
        }
        return router
    }

    async render() {
        if (window.__ssr_init_state__) {
            this.store.replaceState(window.__ssr_init_state__)
        }
        let session = window.localStorage.getItem("session");
        if (session) {
            this.store.dispatch('loadSession', session);
        }
        this.store.subscribeAction(action => {
            if (action.type == 'saveSession') {
                console.info('save session', action.payload)
                window.localStorage.setItem('session', action.payload)
            }
        })
        await this.router.isReady()
        if (process.env.NODE_ENV != "development") {
            this.router.beforeResolve(this.beforeRouterResolve.bind(this))
        }
        this.app.mount('#app')
    }

    async loadAsyncData(to: RouteLocationNormalized, actions: string[]) {
        try {
            await super.loadAsyncData(to, actions)
        } catch (e) {
            console.error(e)
        }
    }
}

new ClientApplication().render()