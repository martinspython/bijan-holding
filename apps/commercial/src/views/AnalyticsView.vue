<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { BijanCard, BijanBadge, BijanSkeleton } from '@bijan/ui'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useProcurementStore } from '../stores/procurement'
import {
  BarChart3, TrendingUp, DollarSign, Activity,
} from 'lucide-vue-next'

use([PieChart, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer])

const store = useProcurementStore()

onMounted(() => { store.fetchDashboard() })

const monthlySpend = computed(() => ({
  tooltip: { trigger: 'axis' as const },
  legend: { data: ['هزینه ماهانه', 'میانگین'], textStyle: { color: '#888' }, bottom: 0 },
  grid: { left: '3%', right: '4%', bottom: '20%', top: '3%', containLabel: true },
  xAxis: { type: 'category' as const, data: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'], axisLabel: { color: '#888' } },
  yAxis: { type: 'value' as const, name: 'میلیارد ریال', nameTextStyle: { color: '#888' }, axisLabel: { color: '#888' } },
  series: [
    {
      name: 'هزینه ماهانه', type: 'bar', barWidth: '35%',
      data: [220, 245, 268, 284, 252, 238],
      itemStyle: { color: '#C41E3A', borderRadius: [4, 4, 0, 0] },
    },
    {
      name: 'میانگین', type: 'line',
      data: [240, 240, 240, 240, 240, 240],
      lineStyle: { color: '#D4AF37', type: 'dashed' as const },
      symbol: 'none',
    },
  ],
}))

const categoryChart = computed(() => {
  if (!store.dashboard) return {}
  return {
    tooltip: { trigger: 'item' as const, formatter: '{b}: {c}%' },
    legend: { bottom: 0, textStyle: { color: '#888' } },
    series: [{
      type: 'pie', radius: ['30%', '60%'],
      data: store.dashboard.spendByCategory.map((c) => ({
        name: c.category, value: c.percentage,
        itemStyle: { color: c.category === 'مواد اولیه' ? '#C41E3A' : c.category === 'بسته‌بندی' ? '#2D5016' : c.category === 'مواد شیمیایی' ? '#FF6B35' : c.category === 'قطعات یدکی' ? '#D4AF37' : c.category === 'خدمات' ? '#1E40AF' : '#888' },
      })),
      label: { show: true, formatter: '{b}: {d}%', color: '#888' },
    }],
  }
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">تحلیل داده تدارکات</h1>
      <p class="mt-1 text-sm text-muted-foreground">داشبورد تحلیلی هزینه‌ها و روندهای خرید</p>
    </div>

    <div v-if="store.loading" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <BijanSkeleton v-for="i in 2" :key="i" variant="card" height="350px" />
    </div>

    <template v-else>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <div class="rounded-lg border p-4">
          <div class="text-brand-red mb-2"><BarChart3 class="h-5 w-5" /></div>
          <p class="text-2xl font-bold">{{ (store.dashboard?.monthlySpend ?? 0).toLocaleString('fa-IR') }}</p>
          <p class="text-xs text-muted-foreground">ریال تدارکات ماه جاری</p>
        </div>
        <div class="rounded-lg border p-4">
          <div class="text-brand-green mb-2"><TrendingUp class="h-5 w-5" /></div>
          <p class="text-2xl font-bold">{{ (store.dashboard?.savingsYTD ?? 0).toLocaleString('fa-IR') }}</p>
          <p class="text-xs text-muted-foreground">ریال صرفه‌جویی از ابتدای سال</p>
        </div>
        <div class="rounded-lg border p-4">
          <div class="text-brand-orange mb-2"><DollarSign class="h-5 w-5" /></div>
          <p class="text-2xl font-bold">{{ ((store.dashboard?.monthlySpend ?? 0) / 156).toFixed(2) }}</p>
          <p class="text-xs text-muted-foreground">میانگین هزینه روزانه (میلیارد)</p>
        </div>
        <div class="rounded-lg border p-4">
          <div class="text-brand-gold mb-2"><Activity class="h-5 w-5" /></div>
          <p class="text-2xl font-bold">۸۴۲</p>
          <p class="text-xs text-muted-foreground">تعداد کل سفارشات سال</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BijanCard>
          <template #default>
            <h2 class="text-lg font-semibold mb-4">روند هزینه ماهانه</h2>
            <VChart :option="monthlySpend" autoresize class="h-[320px]" />
          </template>
        </BijanCard>

        <BijanCard>
          <template #default>
            <h2 class="text-lg font-semibold mb-4">توزیع هزینه به تفکیک دسته</h2>
            <VChart :option="categoryChart" autoresize class="h-[320px]" />
          </template>
        </BijanCard>
      </div>

      <BijanCard>
        <template #default>
          <h2 class="text-lg font-semibold mb-4">شاخص‌های کلیدی عملکرد</h2>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div class="text-center p-3 rounded-lg bg-muted/30">
              <p class="text-sm font-bold text-brand-red">۹۱.۲٪</p>
              <p class="text-[10px] text-muted-foreground">تحویل به موقع</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-muted/30">
              <p class="text-sm font-bold text-brand-green">۸۷.۶٪</p>
              <p class="text-[10px] text-muted-foreground">رضایت تأمین‌کننده</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-muted/30">
              <p class="text-sm font-bold text-brand-orange">۱۲.۳٪</p>
              <p class="text-[10px] text-muted-foreground">نرخ صرفه‌جویی</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-muted/30">
              <p class="text-sm font-bold text-brand-gold">۶.۸</p>
              <p class="text-[10px] text-muted-foreground">میانگین روز تأخیر</p>
            </div>
          </div>
        </template>
      </BijanCard>
    </template>
  </div>
</template>
