import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: { public: true }
    },
    // {
    //   path: '/dashboard',
    //   component: () => import('@/pages/DashboardPage.vue'),
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, _, next) => {
  const { isAuthenticated } = useAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isPublic = to.matched.some(record => record.meta.public)

  if (requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else if (isPublic && isAuthenticated.value) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router