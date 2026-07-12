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
      component: () => import('./layouts/CommercialLayout.vue'),
      redirect: '/dashboard',
      children: [
        { path: 'dashboard', name: 'dashboard', component: () => import('./views/DashboardView.vue') },
        { path: 'suppliers', name: 'suppliers', component: () => import('./views/SuppliersView.vue') },
        { path: 'contracts', name: 'contracts', component: () => import('./views/ContractsView.vue') },
        { path: 'purchase-orders', name: 'purchase-orders', component: () => import('./views/PurchaseOrdersView.vue') },
        { path: 'analytics', name: 'analytics', component: () => import('./views/AnalyticsView.vue') },
        { path: 'supply-chain', name: 'supply-chain', component: () => import('./views/SupplyChainView.vue') },
        { path: 'negotiation', name: 'negotiation', component: () => import('./views/NegotiationView.vue') },
        { path: 'settings', name: 'settings', component: () => import('./views/SettingsView.vue') },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('bijan-commercial-token')
  if (to.name !== 'login' && !token) {
    return { name: 'login' }
  }
  return true
})

router.onError((err) => {
  console.warn('Commercial navigation error:', err)
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
