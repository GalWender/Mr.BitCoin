import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginSignup from '../views/LoginSignup.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginSignup
    },
    {
      path: '/about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    },
    {
      path: '/contact',
      component: () => import('../views/Contact.vue')

    },
    {
      path: '/contact/:_id',
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/statistic',
      component: () => import('../views/Statistic.vue')
    },
    {
      path: '/contact/edit/:_id?',
      component: () => import('../views/ContactEdit.vue')
    }
  ]
})

export default router
