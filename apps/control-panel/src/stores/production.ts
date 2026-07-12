import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProductionLine } from '@bijan/types'
import { mockProductionLines } from '../mock/data'

export const useProductionStore = defineStore('production', () => {
  const lines = ref<ProductionLine[]>([])
  const loading = ref(false)

  async function fetchLines(): Promise<void> {
    loading.value = true
    await new Promise((r) => setTimeout(r, 500))
    lines.value = [...mockProductionLines]
    loading.value = false
  }

  return { lines, loading, fetchLines }
})
