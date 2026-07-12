import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FestivalStore } from '@bijan/types'
import { mockFestivalStores } from '../mock/data'

export const useFestivalStore = defineStore('festival', () => {
  const stores = ref<FestivalStore[]>([])
  const loading = ref(false)

  async function fetchStores(): Promise<void> {
    loading.value = true
    await new Promise((r) => setTimeout(r, 500))
    stores.value = [...mockFestivalStores]
    loading.value = false
  }

  return { stores, loading, fetchStores }
})
