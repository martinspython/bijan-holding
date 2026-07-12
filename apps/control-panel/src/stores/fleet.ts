import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FleetVehicle } from '@bijan/types'
import { mockFleetVehicles } from '../mock/data'

export const useFleetStore = defineStore('fleet', () => {
  const vehicles = ref<FleetVehicle[]>([])
  const loading = ref(false)

  async function fetchVehicles(): Promise<void> {
    loading.value = true
    await new Promise((r) => setTimeout(r, 600))
    vehicles.value = [...mockFleetVehicles]
    loading.value = false
  }

  return { vehicles, loading, fetchVehicles }
})
