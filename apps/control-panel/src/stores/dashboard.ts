import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DashboardSummary } from '@bijan/types'
import { mockDashboard } from '../mock/data'

export const useDashboardStore = defineStore('dashboard', () => {
  const summary = ref<DashboardSummary | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSummary(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await new Promise((r) => setTimeout(r, 600))
      summary.value = { ...mockDashboard }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'خطا در دریافت اطلاعات'
    } finally {
      loading.value = false
    }
  }

  return { summary, loading, error, fetchSummary }
})
