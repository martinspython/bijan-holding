import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Supplier } from '../types/commercial'
import { mockSuppliers } from '../mock/data'

export const useSupplierStore = defineStore('supplier', () => {
  const suppliers = ref<Supplier[]>(mockSuppliers)
  const selectedSupplierId = ref<string | null>(null)
  const loading = ref(false)

  const selectedSupplier = computed(() =>
    suppliers.value.find((s) => s.id === selectedSupplierId.value) ?? null,
  )

  const filteredSuppliers = computed(() => suppliers.value)

  async function fetchSuppliers(): Promise<void> {
    loading.value = true
    await new Promise((r) => setTimeout(r, 300))
    suppliers.value = [...mockSuppliers]
    loading.value = false
  }

  function selectSupplier(id: string | null): void {
    selectedSupplierId.value = id
  }

  return { suppliers, selectedSupplierId, selectedSupplier, filteredSuppliers, loading, fetchSuppliers, selectSupplier }
})
