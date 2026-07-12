<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useSalesStore } from '../stores/sales'
import { BijanCard, BijanBadge, BijanKpiCard, BijanDataTable, } from '@bijan/ui'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([LineChart, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const store = useSalesStore()
onMounted(() => {
  store.fetchSalesData()
  store.fetchProducts()
})

const totalRevenue = computed(() => store.salesData.reduce((s, d) => s + d.revenue, 0))
const totalOrders = computed(() => store.salesData.reduce((s, d) => s + d.orders, 0))

const revenueChartOption = computed(() => ({
  tooltip: { trigger: 'axis' as const, valueFormatter: (v: number) => `${(v / 1e9).toFixed(1)} میلیارد` },
  grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
  xAxis: { type: 'category' as const, data: store.salesData.slice(-14).map((d) => d.date.slice(5)), axisLabel: { color: '#888', fontSize: 10 } },
  yAxis: { type: 'value' as const, axisLabel: { color: '#888', formatter: (v: number) => `${(v / 1e9).toFixed(0)}م` } },
  series: [{
    type: 'line', smooth: true, data: store.salesData.slice(-14).map((d) => d.revenue),
    lineStyle: { color: '#C41E3A', width: 3 },
    areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(196,30,58,0.3)' }, { offset: 1, color: 'rgba(196,30,58,0)' }] } },
    itemStyle: { color: '#C41E3A' },
  }],
}))

const productColumns = [
  { key: 'name', label: 'نام محصول', sortable: true },
  { key: 'category', label: 'دسته', sortable: true },
  { key: 'sku', label: 'کد کالا' },
  { key: 'price', label: 'قیمت (ریال)', sortable: true, align: 'left' as const },
  { key: 'stock', label: 'موجودی', sortable: true, align: 'left' as const },
  { key: 'status', label: 'وضعیت', sortable: true, render: (row: any) => row.status === 'active' ? 'فعال' : row.status === 'discontinued' ? 'متوقف' : 'فصلی' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">مدیریت فروش</h1>
      <p class="mt-1 text-sm text-muted-foreground">تحلیل فروش و محصولات</p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <BijanKpiCard label="فروش کل دوره" :value="totalRevenue" unit="ریال" trend="up" :change-percentage="8.3" />
      <BijanKpiCard label="تعداد سفارشات" :value="totalOrders" unit="سفارش" trend="up" :change-percentage="5.7" />
      <BijanKpiCard label="محصولات فعال" :value="store.products.filter((p) => p.status === 'active').length" unit="محصول" trend="stable" />
      <BijanKpiCard label="میانگین فروش روزانه" :value="totalRevenue / Math.max(store.salesData.length, 1)" unit="ریال" trend="up" :change-percentage="2.1" />
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <BijanCard class="xl:col-span-2">
        <h2 class="mb-4 text-lg font-semibold">روند فروش ۱۴ روز اخیر</h2>
        <VChart :option="revenueChartOption" class="h-72 w-full" autoresize />
      </BijanCard>

      <BijanCard>
        <h2 class="mb-4 text-lg font-semibold">توزیع کانال‌ها</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between rounded-lg border p-3">
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-brand-red" />
              <span class="text-sm">خرده‌فروشی</span>
            </div>
            <span class="text-sm font-semibold">۴۵٪</span>
          </div>
          <div class="flex items-center justify-between rounded-lg border p-3">
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-brand-gold" />
              <span class="text-sm">عمده‌فروشی</span>
            </div>
            <span class="text-sm font-semibold">۳۵٪</span>
          </div>
          <div class="flex items-center justify-between rounded-lg border p-3">
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-brand-green" />
              <span class="text-sm">صادرات</span>
            </div>
            <span class="text-sm font-semibold">۲۰٪</span>
          </div>
        </div>
      </BijanCard>
    </div>

    <BijanCard>
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">محصولات</h2>
        <BijanBadge variant="success">{{ store.products.filter((p) => p.status === 'active').length }} محصول فعال</BijanBadge>
      </div>
      <BijanDataTable :columns="productColumns" :data="store.products as any[]" :page-size="10" />
    </BijanCard>
  </div>
</template>
