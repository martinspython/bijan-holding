import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SalesData, Product } from '@bijan/types'
import { mockSalesData, mockProducts } from '../mock/data'

export const useSalesStore = defineStore('sales', () => {
  const salesData = ref<SalesData[]>([])
  const products = ref<Product[]>([])
  const loading = ref(false)

  async function fetchSalesData(): Promise<void> {
    loading.value = true
    await new Promise((r) => setTimeout(r, 500))
    salesData.value = [...mockSalesData]
    loading.value = false
  }

  async function fetchProducts(): Promise<void> {
    await new Promise((r) => setTimeout(r, 300))
    products.value = [...mockProducts]
  }

  return { salesData, products, loading, fetchSalesData, fetchProducts }
})
