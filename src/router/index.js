import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Cadastro from '../pages/Cadastro.vue'
import Login from '../pages/Login.vue'
import Member from '../pages/Member.vue'
import Project from '../pages/Project.vue'
import ViewNews from '../pages/ViewNews/ViewNews.vue'
import Link from '../pages/Link.vue'
import Settings from '../pages/Settings.vue'

const isUsuarioAutenticado = () => {
    return !!localStorage.getItem('@jwt')
}

const isPresident = () => {
    return localStorage.getItem('@role') === 'Presidente'
}

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Login',
        path: '/entrar',
        component: Login
    },
    {
        name: 'Cadastro',
        path: '/cadastrar',
        component: Cadastro
    },
    {
        name: 'Member',
        path: '/membros',
        component: Member,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'Project',
        path: '/projetos',
        component: Project,
        meta: {
            requiresAuth: true
        }
    },
    {
      name: 'ViewNews',
      path: '/project/:projectId/news',
      component: ViewNews,
      meta: {
          requiresAuth: true
      }
    },
    {
        name: 'Link',
        path: '/links',
        component: Link,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'Settings',
        path: '/configuracoes',
        component: Settings,
        meta: {
            requiresAuth: true,
            requiresPresidentRole: true
        }
    }
]

const noAuthRoutes = ['/cadastrar', '/entrar', '/']

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

router.beforeEach((to, from, next) => {
    if (from.path === '/' && noAuthRoutes.includes(to.path)) {
        if (isUsuarioAutenticado()) {
            next({ name: 'Member' })
        } else {
            next()
        }
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isUsuarioAutenticado()) {
            next({ name: 'Login' })
        } else {
            if (to.matched.some(record => record.meta.requiresPresidentRole)) {
                if (!isPresident()) {
                    next({ name: 'Member' })
                } else {
                    next()
                }
            } else {
                next() // go to wherever I'm going
            }
        }
    } else {
        next() // does not require auth, make sure to always call next()!
    }
})

export default router;