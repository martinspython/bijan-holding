import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Contract } from '../types/commercial'
import { mockContracts } from '../mock/data'

export const useContractStore = defineStore('contract', () => {
  const contracts = ref<Contract[]>(mockContracts)
  const selectedContractId = ref<string | null>(null)
  const loading = ref(false)

  const selectedContract = computed(() =>
    contracts.value.find((c) => c.id === selectedContractId.value) ?? null,
  )

  const activeContracts = computed(() =>
    contracts.value.filter((c) => c.status === 'active'),
  )

  async function fetchContracts(): Promise<void> {
    loading.value = true
    await new Promise((r) => setTimeout(r, 300))
    contracts.value = [...mockContracts]
    loading.value = false
  }

  function selectContract(id: string | null): void {
    selectedContractId.value = id
  }

  return { contracts, selectedContractId, selectedContract, activeContracts, loading, fetchContracts, selectContract }
})
