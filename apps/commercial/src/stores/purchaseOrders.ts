import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PurchaseOrder } from '../types/commercial'
import { mockPurchaseOrders } from '../mock/data'

export const usePurchaseOrderStore = defineStore('purchaseOrder', () => {
  const orders = ref<PurchaseOrder[]>(mockPurchaseOrders)
  const selectedOrderId = ref<string | null>(null)
  const loading = ref(false)

  const selectedOrder = computed(() =>
    orders.value.find((o) => o.id === selectedOrderId.value) ?? null,
  )

  const pendingApproval = computed(() =>
    orders.value.filter((o) => o.status === 'pending-approval'),
  )

  const urgentOrders = computed(() =>
    orders.value.filter((o) => o.urgency === 'critical' || o.urgency === 'high'),
  )

  async function fetchOrders(): Promise<void> {
    loading.value = true
    await new Promise((r) => setTimeout(r, 300))
    orders.value = [...mockPurchaseOrders]
    loading.value = false
  }

  function selectOrder(id: string | null): void {
    selectedOrderId.value = id
  }

  return { orders, selectedOrderId, selectedOrder, pendingApproval, urgentOrders, loading, fetchOrders, selectOrder }
})
