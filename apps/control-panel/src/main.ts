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
      component: () => import('./views/LoginView.vue'),
    },
    {
      path: '/',
      component: () => import('./layouts/DashboardLayout.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('./views/DashboardView.vue'),
        },
        {
          path: 'production',
          name: 'production',
          component: () => import('./views/ProductionView.vue'),
        },
        {
          path: 'fleet',
          name: 'fleet',
          component: () => import('./views/FleetView.vue'),
        },
        {
          path: 'sales',
          name: 'sales',
          component: () => import('./views/SalesView.vue'),
        },
        {
          path: 'hr',
          name: 'hr',
          component: () => import('./views/HRView.vue'),
        },
        {
          path: 'festival',
          name: 'festival',
          component: () => import('./views/FestivalView.vue'),
        },
        {
          path: 'reports',
          name: 'reports',
          component: () => import('./views/ReportsView.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('./views/SettingsView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('bijan-token')
  if (to.name !== 'login' && !token) {
    return { name: 'login' }
  }
  return true
})

router.onError((err) => {
  console.warn('Navigation error:', err)
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
