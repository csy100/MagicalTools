import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/main/index.vue'),
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    component: () => import('@/views/home/index.vue'),
                    name: 'Home'
                },
                {
                    path: '/tools',
                    component: () => import('@/views/tools/index.vue'),
                    name: 'AITools',
                },
                {
                    path: '/pay',
                    component: () => import('@/views/pay/index.vue'),
                    name: 'Pay'
                },
                {
                    path: '/inform',
                    component: () => import('@/views/inform/index.vue'),
                    name: 'Inform'
                }
            ]
        },
        {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
            name: 'LoginAndRegister'
        },
        {
            path: '/person',
            component: () => import('@/views/user/index.vue'),
            name: 'personalCenter'
        }
    ],
    //滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    }
})

export default router;