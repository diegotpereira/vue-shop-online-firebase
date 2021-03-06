import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Visaogeral from '../views/Visaogeral.vue'
import Produtos from '../views/Produtos.vue'
import Perfil from '../views/Perfil.vue'
import Pedidos from '../views/Pedidos.vue'
import { fb } from '../firebase'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [


        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                requiresAuth: true
            },
            children: [

                {

                    path: 'visaogeral',
                    name: 'Visaogeral',
                    component: Visaogeral
                },

                {
                    path: 'produtos',
                    name: 'produtos',
                    component: Produtos
                },
                {
                    path: 'perfil',
                    name: 'perfil',
                    component: Perfil
                },
                {
                    path: 'pedidos',
                    name: 'pedidos',
                    component: Pedidos
                }
            ]
        },
        {
            path: '/concluir',
            name: 'concluir',
            component: () =>
                import ( /* webpackChunkName: "about" */ "../views/Concluir.vue")
        },
        {
            path: "/about",
            name: "about",
            component: () =>
                import ( /* webpackChunkName: "about" */ "../views/About.vue")
        }
    ]
})
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = fb.auth().currentUser

    if (requiresAuth && !currentUser) {
        next('/')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})

export default router