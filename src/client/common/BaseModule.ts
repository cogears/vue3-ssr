import { Module } from 'vuex'

export default abstract class BaseModule<T> {
    readonly name: string
    constructor(name: string) {
        this.name = name
    }

    key(action: string) {
        return this.name + '/' + action
    }

    abstract generate(): Module<T, any>
}
