import { App, Component } from 'vue'
import { NavigationGuardNext, RouteLocationNormalized, Router, RouteRecordRaw } from 'vue-router'
import { createStore, Store, StoreOptions } from 'vuex'
import generateStoreOptions from './store'
import { Root, routes, ViewContext } from './views'

export default class Application {
    readonly app: App
    readonly store: Store<any>
    readonly router: Router

    constructor() {
        this.app = this.createVueApp(Root);
        this.store = this.createStore(generateStoreOptions())
        this.router = this.createRouter(routes)
        this.app.use(this.store)
        this.app.use(this.router)
        this.app.provide('context', new ViewContext(this))
    }

    createVueApp(rootComponent: Component): App {
        throw new Error('unimplements this method')
    }

    createRouter(routes: RouteRecordRaw[]): Router {
        throw new Error('unimplements this method')
    }

    createStore(options: StoreOptions<any>) {
        return createStore(options)
    }

    async beforeRouterResolve(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
        let actions = to.matched.map(item => item.meta.asyncData).filter(action => action) as string[]
        if (actions.length > 0) {
            await this.loadAsyncData(to, actions)
        }
        next()
    }

    async loadAsyncData(to: RouteLocationNormalized, actions: string[]) {
        console.info('load', actions.join(','))
        await Promise.all(actions.map(item => this.store.dispatch(item, to)))
    }
}