import { Store, StoreOptions, useStore } from 'vuex';

interface State {
    hello: string,
    names: string[]
}

export const LOAD_HOME = 'load_home';

export function getStore(): Store<State> {
    return useStore<State>()
}

export default function (): StoreOptions<State> {
    return {
        state: {
            hello: 'world',
            names: ['hello', 'world']
        },
        mutations: {
            updateNames(state, names: string[]) {
                state.names = names;
            }
        },
        actions: {
            async [LOAD_HOME](context) {
                let list = await api();
                context.commit('updateNames', list);
            }
        }
    }
}

function api() {
    console.info('----call api---')
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(['good', 'bye'])
        }, 500);
    })
}