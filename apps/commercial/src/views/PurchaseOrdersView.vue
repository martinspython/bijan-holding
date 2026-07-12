<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { BijanCard, BijanBadge, BijanSkeleton } from '@bijan/ui'
import { usePurchaseOrderStore } from '../stores/purchaseOrders'
import type { PurchaseOrder } from '../types/commercial'
import {
  ShoppingCart, Search, Clock, CheckCircle, Truck, AlertTriangle,
  ChevronLeft, Eye, FileText, DollarSign,
} from 'lucide-vue-next'

const store = usePurchaseOrderStore()
const searchQuery = ref('')
const selectedStatus = ref<string | null>(null)

onMounted(() => { store.fetchOrders() })

const statusVariant = (status: string) => {
  switch (status) {
    case 'draft': return 'default' as const
    case 'pending-approval': return 'warning' as const
    case 'approved': return 'info' as const
    case 'shipped': return 'info' as const
    case 'partial': return 'warning' as const
    case 'delivered': return 'success' as const
    case 'cancelled': return 'error' as const
    default: return 'default' as const
  }
}

const statusLabel: Record<string, string> = {
  draft: 'پیش‌نویس', 'pending-approval': 'در انتظار تأیید', approved: 'تأیید شده',
  shipped: 'بارگیری شده', partial: 'تحویل ناقص', delivered: 'تحویل شده', cancelled: 'لغو شده',
}

const urgencyVariant = (u: string) => {
  switch (u) {
    case 'critical': return 'error' as const
    case 'high': return 'warning' as const
    case 'normal': return 'default' as const
    default: return 'default' as const
  }
}

const filteredOrders = computed(() => {
  let result = store.orders
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((o) =>
      o.poNumber.toLowerCase().includes(q) || o.supplierName.toLowerCase().includes(q),
    )
  }
  if (selectedStatus.value) {
    result = result.filter((o) => o.status === selectedStatus.value)
  }
  return result
})

const showDetail = ref(false)
function viewDetail(po: PurchaseOrder): void {
  store.selectOrder(po.id)
  showDetail.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">سفارشات خرید</h1>
      <p class="mt-1 text-sm text-muted-foreground">مدیریت {{ store.orders.length }} سفارش خرید</p>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <div class="rounded-lg border p-3 text-center">
        <p class="text-lg font-bold text-amber-500">{{ store.pendingApproval.length }}</p>
        <p class="text-[10px] text-muted-foreground">در انتظار تأیید</p>
      </div>
      <div class="rounded-lg border p-3 text-center">
        <p class="text-lg font-bold text-red-500">{{ store.urgentOrders.length }}</p>
        <p class="text-[10px] text-muted-foreground">فوری / بحرانی</p>
      </div>
      <div class="rounded-lg border p-3 text-center">
        <p class="text-lg font-bold text-green-600">{{ store.orders.filter((o) => o.status === 'delivered').length }}</p>
        <p class="text-[10px] text-muted-foreground">تحویل شده</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <div class="relative flex-1 min-w-[200px] max-w-sm">
        <Search class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input v-model="searchQuery" type="text" placeholder="جستجوی سفارش..."
          class="h-10 w-full rounded-lg border bg-background pr-10 pl-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="جستجوی سفارش" />
      </div>
      <select v-model="selectedStatus"
        class="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="فیلتر وضعیت">
        <option :value="null">همه وضعیت‌ها</option>
        <option v-for="[key, label] of Object.entries(statusLabel)" :key="key" :value="key">{{ label }}</option>
      </select>
    </div>

    <div v-if="store.loading" class="space-y-3">
      <BijanSkeleton v-for="i in 5" :key="i" variant="card" height="120px" />
    </div>

    <div v-else class="space-y-3">
      <div v-for="po in filteredOrders" :key="po.id"
        class="rounded-xl border bg-card p-4 transition-all hover:shadow-md cursor-pointer"
        @click="viewDetail(po)">
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg"
              :class="po.urgency === 'critical' ? 'bg-red-100 dark:bg-red-900/30' : po.urgency === 'high' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-muted'">
              <ShoppingCart class="h-5 w-5"
                :class="po.urgency === 'critical' ? 'text-red-500' : po.urgency === 'high' ? 'text-amber-500' : 'text-muted-foreground'" />
            </div>
            <div>
              <p class="text-sm font-semibold">{{ po.poNumber }}</p>
              <p class="text-xs text-muted-foreground">{{ po.supplierName }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <BijanBadge :variant="urgencyVariant(po.urgency)" size="sm">
              {{ po.urgency === 'critical' ? 'بحرانی' : po.urgency === 'high' ? 'فوری' : 'معمولی' }}
            </BijanBadge>
            <BijanBadge :variant="statusVariant(po.status)" size="sm">
              {{ statusLabel[po.status] }}
            </BijanBadge>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>{{ po.items.length }} قلم کالا</span>
          <span>{{ (po.totalAmount / 1000000).toFixed(0).toLocaleString('fa-IR') }} میلیون ریال</span>
          <span class="flex items-center gap-1"><Clock class="h-3 w-3" /> {{ po.expectedDate }}</span>
          <span>{{ po.shippingMethod }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
