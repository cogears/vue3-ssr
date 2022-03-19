import { LOAD_HOME } from '@/store';
export default {
    name: 'home',
    path: '/',
    component: () => import('./Root.vue'),
    meta: {
        asyncData: LOAD_HOME
    }
}