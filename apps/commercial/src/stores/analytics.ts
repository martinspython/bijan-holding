import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { NegotiationSession, SupplyChainNode, SupplyChainRoute } from '../types/commercial'
import { mockNegotiations, mockSupplyChainNodes, mockSupplyChainRoutes } from '../mock/data'

export const useCommercialAnalyticsStore = defineStore('commercialAnalytics', () => {
  const negotiations = ref<NegotiationSession[]>(mockNegotiations)
  const supplyChainNodes = ref<SupplyChainNode[]>(mockSupplyChainNodes)
  const supplyChainRoutes = ref<SupplyChainRoute[]>(mockSupplyChainRoutes)
  const loading = ref(false)

  async function fetchAll(): Promise<void> {
    loading.value = true
    await new Promise((r) => setTimeout(r, 300))
    negotiations.value = [...mockNegotiations]
    supplyChainNodes.value = [...mockSupplyChainNodes]
    supplyChainRoutes.value = [...mockSupplyChainRoutes]
    loading.value = false
  }

  return { negotiations, supplyChainNodes, supplyChainRoutes, loading, fetchAll }
})
