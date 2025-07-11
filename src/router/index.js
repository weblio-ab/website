import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/guides',
    name: 'Guides',
    component: () => import('../views/Guides.vue')
  },
  {
    path: '/guides/:guideId',
    name: 'Guide',
    component: () => import('../views/Guides.vue'),
    props: true
  },
  {
    path: '/guides/:guideId/:device',
    name: 'GuideWithDevice',
    component: () => import('../views/Guides.vue'),
    props: true
  },
  {
    path: '/guides/:guideId/:device/:client',
    name: 'GuideWithDeviceAndClient',
    component: () => import('../views/Guides.vue'),
    props: true
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/Privacy.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/Terms.vue')
  },
  {
    path: '/cookies',
    name: 'Cookies',
    component: () => import('../views/Cookies.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (back/forward button), use it
    if (savedPosition) {
      return savedPosition
    }
    
    // If there's a hash, scroll to that element
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    
    // Default to top of page
    return { top: 0 }
  }
})

export default router
