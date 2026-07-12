<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { BijanKpiCard, BijanCard, BijanBadge, BijanSkeleton } from '@bijan/ui'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useProcurementStore } from '../stores/procurement'
import {
  TrendingUp, AlertTriangle, FileText, ShoppingCart, DollarSign, Clock,
} from 'lucide-vue-next'

use([PieChart, BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const store = useProcurementStore()
const router = useRouter()

onMounted(() => { store.fetchDashboard() })

const spendChart = computed(() => {
  if (!store.dashboard) return {}
  return {
    tooltip: { trigger: 'item' as const, formatter: '{b}: {c} ریال ({d}%)' },
    legend: { bottom: 0, textStyle: { color: '#888' } },
    series: [{
      type: 'pie', radius: ['40%', '70%'], center: ['50%', '45%'],
      data: store.dashboard.spendByCategory.map((c) => ({
        name: c.category, value: c.amount,
        itemStyle: { color: c.category === 'مواد اولیه' ? '#C41E3A' : c.category === 'بسته‌بندی' ? '#2D5016' : c.category === 'مواد شیمیایی' ? '#FF6B35' : c.category === 'قطعات یدکی' ? '#D4AF37' : c.category === 'خدمات' ? '#1E40AF' : '#888' },
      })),
      label: { show: false },
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } },
    }],
  }
})

const topSuppliersChart = computed(() => {
  if (!store.dashboard) return {}
  return {
    tooltip: { trigger: 'axis' as const, formatter: '{b}: {c} ریال' },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '3%', containLabel: true },
    xAxis: { type: 'category' as const, data: (store.dashboard?.topSuppliers ?? []).map((s) => s.name), axisLabel: { color: '#888', rotate: 15 } },
    yAxis: { type: 'value' as const, name: 'ریال', nameTextStyle: { color: '#888' }, axisLabel: { color: '#888' } },
    series: [{
      type: 'bar', barWidth: '40%',
      data: (store.dashboard?.topSuppliers ?? []).map((s) => s.spent),
      itemStyle: { color: '#C41E3A', borderRadius: [4, 4, 0, 0] },
    }],
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">داشبورد بازرگانی</h1>
        <p class="mt-1 text-sm text-muted-foreground">خلاصه عملکرد تدارکات و زنجیره تأمین</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock class="h-4 w-4" />
        <span>{{ new Date().toLocaleDateString('fa-IR') }}</span>
      </div>
    </div>

    <div v-if="store.loading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <BijanSkeleton v-for="i in 6" :key="i" variant="card" height="120px" />
    </div>

    <template v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <BijanKpiCard
          v-for="kpi in store.dashboard?.kpis ?? []" :key="kpi.id"
          v-bind="kpi"
        />
      </div>
    </template>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <BijanCard class="lg:col-span-1">
        <template #default>
          <h2 class="text-lg font-semibold mb-4">اقدامات فوری</h2>
          <div class="space-y-3">
            <div
              v-for="action in store.dashboard?.urgentActions ?? []" :key="action.id"
              class="flex items-start gap-3 rounded-lg border p-3"
            >
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                :class="action.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-amber-100 dark:bg-amber-900/30'">
                <AlertTriangle class="h-4 w-4" :class="action.priority === 'high' ? 'text-red-500' : 'text-amber-500'" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium truncate">{{ action.title }}</p>
                <div class="mt-1 flex items-center gap-2">
                  <BijanBadge :variant="action.priority === 'high' ? 'error' : 'warning'" size="sm">
                    {{ action.priority === 'high' ? 'فوری' : 'معمولی' }}
                  </BijanBadge>
                  <span class="text-[10px] text-muted-foreground">مهلت: {{ action.dueDate }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </BijanCard>

      <BijanCard class="lg:col-span-3">
        <template #default>
          <h2 class="text-lg font-semibold mb-4">توزیع هزینه تدارکات</h2>
          <VChart :option="spendChart" autoresize class="h-[300px]" />
        </template>
      </BijanCard>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <BijanCard>
        <template #default>
          <h2 class="text-lg font-semibold mb-4">تأمین‌کنندگان برتر</h2>
          <VChart :option="topSuppliersChart" autoresize class="h-[300px]" />
        </template>
      </BijanCard>

      <BijanCard>
        <template #default>
          <h2 class="text-lg font-semibold mb-4">خلاصه وضعیت</h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border p-4 text-center">
              <FileText class="mx-auto mb-2 h-6 w-6 text-brand-red" />
              <p class="text-2xl font-bold">{{ store.dashboard?.activeContracts ?? 0 }}</p>
              <p class="text-xs text-muted-foreground">قرارداد فعال</p>
            </div>
            <div class="rounded-lg border p-4 text-center">
              <ShoppingCart class="mx-auto mb-2 h-6 w-6 text-brand-orange" />
              <p class="text-2xl font-bold">{{ store.dashboard?.pendingPOs ?? 0 }}</p>
              <p class="text-xs text-muted-foreground">سفارش در انتظار</p>
            </div>
            <div class="rounded-lg border p-4 text-center">
              <AlertTriangle class="mx-auto mb-2 h-6 w-6 text-red-500" />
              <p class="text-2xl font-bold">{{ store.dashboard?.criticalSuppliers ?? 0 }}</p>
              <p class="text-xs text-muted-foreground">تأمین‌کننده پرخطر</p>
            </div>
            <div class="rounded-lg border p-4 text-center">
              <TrendingUp class="mx-auto mb-2 h-6 w-6 text-brand-green" />
              <p class="text-2xl font-bold">{{ (store.dashboard?.savingsYTD ?? 0).toLocaleString('fa-IR') }}</p>
              <p class="text-xs text-muted-foreground">ریال صرفه‌جویی سال</p>
            </div>
          </div>
        </template>
      </BijanCard>
    </div>
  </div>
</template>
