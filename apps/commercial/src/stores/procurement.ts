import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProcurementDashboard } from '../types/commercial'
import { mockDashboard } from '../mock/data'

export const useProcurementStore = defineStore('procurement', () => {
  const dashboard = ref<ProcurementDashboard | null>(null)
  const loading = ref(false)

  async function fetchDashboard(): Promise<void> {
    loading.value = true
    await new Promise((r) => setTimeout(r, 400))
    dashboard.value = { ...mockDashboard }
    loading.value = false
  }

  return { dashboard, loading, fetchDashboard }
})
