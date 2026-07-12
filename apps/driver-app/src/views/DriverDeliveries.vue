<script setup lang="ts">
import { ref } from 'vue'
import { Package, Clock, CheckCircle } from 'lucide-vue-next'

interface Delivery {
  id: string
  customer: string
  address: string
  items: string
  status: string
  time: string
  amount: string
}

const deliveries = ref<Delivery[]>([
  { id: 'D-001', customer: 'فروشگاه مرکزی تهران', address: 'تهران، ولیعصر', items: '۵۰۰ بسته بیسکویت', status: 'delivered', time: '۰۷:۳۰', amount: '۴۲,۵۰۰,۰۰۰ ریال' },
  { id: 'D-002', customer: 'فروشگاه زنجیره‌ای اصفهان', address: 'اصفهان، چهارباغ', items: '۸۵۰ بسته ویفر', status: 'in-transit', time: '۱۰:۱۵', amount: '۸۰,۷۵۰,۰۰۰ ریال' },
  { id: 'D-003', customer: 'انبار کاشان', address: 'کاشان، شهرک صنعتی', items: '۳۰۰ بسته کیک', status: 'pending', time: '۱۲:۰۰', amount: '۳۶,۰۰۰,۰۰۰ ریال' },
  { id: 'D-004', customer: 'مرکز پخش شیراز', address: 'شیراز، بلوار زند', items: '۶۰۰ بسته کلوچه', status: 'pending', time: '۱۴:۳۰', amount: '۴۵,۰۰۰,۰۰۰ ریال' },
])

const activeTab = ref<'all' | 'in-transit' | 'delivered' | 'pending'>('all')

function filterTab(tab: typeof activeTab.value): void {
  activeTab.value = tab
}

const filteredDeliveries = () => {
  if (activeTab.value === 'all') return deliveries.value
  return deliveries.value.filter((d) => d.status === activeTab.value)
}
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-lg font-bold">محمولات</h1>
      <span class="text-xs text-muted-foreground">{{ deliveries.filter((d) => d.status === 'delivered').length }}/{{ deliveries.length }} تحویل شده</span>
    </div>

    <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
      <button
        v-for="tab in [{ id: 'all' as const, label: 'همه' }, { id: 'in-transit' as const, label: 'در مسیر' }, { id: 'delivered' as const, label: 'تحویل شده' }, { id: 'pending' as const, label: 'در انتظار' }]"
        :key="tab.id"
        class="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-colors"
        :class="activeTab === tab.id ? 'bg-brand-red text-white' : 'bg-muted text-muted-foreground'"
        @click="filterTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="space-y-3">
      <div
        v-for="del in filteredDeliveries()"
        :key="del.id"
        class="rounded-xl border bg-card p-4 active:scale-[0.99] transition-transform"
      >
        <div class="flex items-start justify-between mb-2">
          <div>
            <h3 class="font-semibold text-sm">{{ del.customer }}</h3>
            <p class="text-xs text-muted-foreground">{{ del.address }}</p>
          </div>
          <span
            class="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium"
            :class="{
              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300': del.status === 'delivered',
              'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300': del.status === 'in-transit',
              'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300': del.status === 'pending',
            }"
          >
            {{ del.status === 'delivered' ? 'تحویل شده' : del.status === 'in-transit' ? 'در مسیر' : 'در انتظار' }}
          </span>
        </div>
        <div class="flex items-center gap-4 text-xs text-muted-foreground">
          <span class="flex items-center gap-1">
            <Package class="h-3 w-3" />{{ del.items }}
          </span>
          <span class="flex items-center gap-1">
            <Clock class="h-3 w-3" />{{ del.time }}
          </span>
        </div>
        <div class="mt-2 flex items-center justify-between border-t pt-2">
          <span class="text-xs font-semibold">{{ del.amount }}</span>
          <button
            v-if="del.status !== 'delivered'"
            class="rounded-lg bg-brand-red px-3 py-1 text-xs font-medium text-white active:scale-95"
          >
            ثبت تحویل
          </button>
          <CheckCircle v-else class="h-4 w-4 text-green-600" />
        </div>
      </div>
    </div>
  </div>
</template>
