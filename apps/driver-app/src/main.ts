import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import '@bijan/ui/src/globals.css'

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/DriverLogin.vue'),
    },
    {
      path: '/',
      component: () => import('./layouts/DriverLayout.vue'),
      redirect: '/dashboard',
      children: [
        { path: 'dashboard', name: 'dashboard', component: () => import('./views/DriverDashboard.vue') },
        { path: 'route', name: 'route', component: () => import('./views/DriverRoute.vue') },
        { path: 'deliveries', name: 'deliveries', component: () => import('./views/DriverDeliveries.vue') },
        { path: 'profile', name: 'profile', component: () => import('./views/DriverProfile.vue') },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('bijan-driver-token')
  if (to.name !== 'login' && !token) {
    return { name: 'login' }
  }
  return true
})

router.onError((err) => {
  console.warn('Driver navigation error:', err)
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
