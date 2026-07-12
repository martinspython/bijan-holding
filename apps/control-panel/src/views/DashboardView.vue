<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import { BijanKpiCard, BijanCard, BijanBadge, BijanAlert, BijanTimeline, BijanSkeleton } from '@bijan/ui'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { computed } from 'vue'

use([LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const store = useDashboardStore()

onMounted(() => {
  store.fetchSummary()
})

const productionChartOption = computed(() => ({
  tooltip: { trigger: 'axis' as const },
  legend: { data: ['تولید روزانه', 'هدف روزانه'], textStyle: { color: '#888' }, bottom: 0 },
  grid: { left: '3%', right: '4%', bottom: '15%', top: '3%', containLabel: true },
  xAxis: { type: 'category' as const, data: ['خط A', 'خط B', 'خط C', 'خط D', 'خط E', 'خط F'], axisLabel: { color: '#888' } },
  yAxis: { type: 'value' as const, name: 'بسته', nameTextStyle: { color: '#888' }, axisLabel: { color: '#888' } },
  series: [
    {
      name: 'تولید روزانه', type: 'bar', barWidth: '30%',
      data: store.summary?.productionOverview.map((l) => l.dailyAchieved) ?? [],
      itemStyle: { color: '#C41E3A', borderRadius: [4, 4, 0, 0] },
    },
    {
      name: 'هدف روزانه', type: 'bar', barWidth: '30%',
      data: store.summary?.productionOverview.map((l) => l.dailyTarget * (l.status === 'running' ? 8 : 6)) ?? [],
      itemStyle: { color: '#D4AF37', borderRadius: [4, 4, 0, 0] },
    },
  ],
}))

const timelineEvents = computed(() => (store.summary?.alerts ?? []).map((a) => ({
  id: a.id,
  type: a.type,
  title: a.message,
  description: a.type === 'critical' ? 'نیازمند اقدام فوری' : a.type === 'warning' ? 'نیازمند بررسی' : 'اطلاع',
  timestamp: a.timestamp,
  user: 'سیستم',
  severity: a.type === 'critical' ? 'error' as const : a.type === 'warning' ? 'warning' as const : 'info' as const,
})))
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">داشبورد</h1>
      <p class="mt-1 text-sm text-muted-foreground">خلاصه عملکرد ۱۱ تیر ۱۴۰۵</p>
    </div>

    <div v-if="store.loading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <BijanSkeleton v-for="i in 6" :key="i" variant="card" height="120px" />
    </div>

    <template v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <BijanKpiCard
          v-for="kpi in store.summary?.kpis ?? []"
          :key="kpi.id"
          v-bind="kpi"
        />
      </div>
    </template>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <BijanCard class="xl:col-span-2">
        <template #default>
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold">تولید روزانه خطوط</h2>
            <div class="flex gap-2">
              <BijanBadge variant="success">فعال</BijanBadge>
              <BijanBadge variant="warning">غیرفعال</BijanBadge>
            </div>
          </div>
          <VChart :option="productionChartOption" class="h-72 w-full" autoresize />
        </template>
      </BijanCard>

      <BijanCard>
        <template #default>
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold">هشدارهای اخیر</h2>
            <span class="text-xs text-muted-foreground">
              {{ store.summary?.alerts.filter((a) => !a.acknowledged).length }} عدد未読
            </span>
          </div>
          <BijanTimeline :events="timelineEvents" />
        </template>
      </BijanCard>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <BijanCard>
        <template #default>
          <h2 class="mb-4 text-lg font-semibold">خلاصه ناوگان</h2>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div class="rounded-lg border p-4 text-center">
              <p class="text-2xl font-bold text-brand-red">{{ store.summary?.fleetSummary.total }}</p>
              <p class="text-xs text-muted-foreground">کل</p>
            </div>
            <div class="rounded-lg border p-4 text-center">
              <p class="text-2xl font-bold text-green-600">{{ store.summary?.fleetSummary.moving }}</p>
              <p class="text-xs text-muted-foreground">در حرکت</p>
            </div>
            <div class="rounded-lg border p-4 text-center">
              <p class="text-2xl font-bold text-amber-500">{{ store.summary?.fleetSummary.idle }}</p>
              <p class="text-xs text-muted-foreground">متوقف</p>
            </div>
            <div class="rounded-lg border p-4 text-center">
              <p class="text-2xl font-bold text-red-500">{{ store.summary?.fleetSummary.maintenance }}</p>
              <p class="text-xs text-muted-foreground">تعمیرات</p>
            </div>
          </div>
        </template>
      </BijanCard>

      <BijanCard>
        <template #default>
          <h2 class="mb-4 text-lg font-semibold">وضعیت خطوط تولید</h2>
          <div class="space-y-3">
            <div
              v-for="line in store.summary?.productionOverview ?? []"
              :key="line.id"
              class="flex items-center justify-between rounded-lg border p-3"
            >
              <div class="flex items-center gap-3">
                <span
                  class="h-2.5 w-2.5 rounded-full"
                  :class="{
                    'bg-green-500': line.status === 'running',
                    'bg-amber-500': line.status === 'idle',
                    'bg-red-500': line.status === 'maintenance' || line.status === 'stopped',
                  }"
                />
                <div>
                  <p class="text-sm font-medium">{{ line.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ line.productName }}</p>
                </div>
              </div>
              <div class="text-left">
                <p class="text-sm font-semibold" dir="ltr">{{ line.efficiency }}%</p>
                <p class="text-[10px] text-muted-foreground">راندمان</p>
              </div>
            </div>
          </div>
        </template>
      </BijanCard>
    </div>
  </div>
</template>
