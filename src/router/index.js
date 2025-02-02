import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/Landing.vue'),
      meta: {
        title: 'Welcome',
        requiresAuth: false,
        redirectIfAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true
      }
    },
    {
      path: '/trade',
      name: 'trade',
      component: () => import('@/views/Trade.vue'),
      meta: {
        title: 'Trading',
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue'),
      meta: {
        title: 'Settings',
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Login',
        requiresAuth: false,
        redirectIfAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        title: 'Create Account',
        requiresAuth: false,
        redirectIfAuth: true
      }
    },
    {
      path: '/bot',
      name: 'bot',
      component: () => import('@/views/Bot.vue'),
      meta: {
        title: 'Trading Bot',
        requiresAuth: true
      }
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: () => import('@/views/Inbox.vue'),
      meta: {
        title: 'Inbox',
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: {
        title: 'Profile',
        requiresAuth: true
      }
    },
    {
      path: '/transaction-history',
      name: 'TransactionHistory',
      component: () => import('@/views/TransactionHistory.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: '404 Not Found'
      }
    }
  ]
})

// Navigation Guards
router.beforeEach(async (to, from, next) => {
  try {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated

    // Update document title
    document.title = `${to.meta.title} - PayloadApp`

    // Redirect authenticated users from auth pages to dashboard
    if (to.meta.redirectIfAuth && isAuthenticated) {
      next({ name: 'dashboard' })
      return
    }

    // Redirect unauthenticated users to landing page
    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ 
        name: 'login', 
        query: { redirect: to.fullPath }
      })
      return
    }

    // If user is on root path and authenticated, redirect to dashboard
    if (to.path === '/' && isAuthenticated) {
      next({ name: 'dashboard' })
      return
    }

    next()
  } catch (error) {
    console.error('Navigation error:', error)
    next(false)
  }
})

export default router
