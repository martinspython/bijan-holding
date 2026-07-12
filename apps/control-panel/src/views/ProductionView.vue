<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProductionStore } from '../stores/production'
import { BijanCard, BijanBadge, BijanStatusDot, BijanDataTable, BijanAlert, BijanButton } from '@bijan/ui'
import { Factory, AlertTriangle, Play, Square } from 'lucide-vue-next'

const store = useProductionStore()
onMounted(() => { store.fetchLines() })

const columns = [
  { key: 'name', label: 'خط تولید', sortable: true },
  { key: 'productName', label: 'محصول', sortable: true },
  { key: 'status', label: 'وضعیت', sortable: true, render: (row: any) => row.status === 'running' ? 'در حال کار' : row.status === 'idle' ? 'متوقف' : row.status === 'maintenance' ? 'تعمیرات' : 'متوقف شده' },
  { key: 'efficiency', label: 'راندمان %', sortable: true, align: 'left' as const },
  { key: 'oee', label: 'OEE %', sortable: true, align: 'left' as const },
  { key: 'operator', label: 'اپراتور', sortable: true },
]

const statsCards = computed(() => [
  { label: 'کل خطوط', value: store.lines.length, color: 'text-brand-red' },
  { label: 'فعال', value: store.lines.filter((l) => l.status === 'running').length, color: 'text-green-600' },
  { label: 'متوقف', value: store.lines.filter((l) => l.status === 'idle' || l.status === 'stopped').length, color: 'text-amber-500' },
  { label: 'تعمیرات', value: store.lines.filter((l) => l.status === 'maintenance').length, color: 'text-red-500' },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">مدیریت تولید</h1>
        <p class="mt-1 text-sm text-muted-foreground">۴۲ خط تولید فعال در ۸ کارخانه</p>
      </div>
      <div class="flex gap-2">
        <BijanButton variant="outline" size="sm">
          <Square class="h-4 w-4" />
          توقف خط
        </BijanButton>
        <BijanButton size="sm">
          <Play class="h-4 w-4" />
          راه‌اندازی
        </BijanButton>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <BijanCard v-for="stat in statsCards" :key="stat.label" padding="sm">
        <div class="text-center">
          <p class="text-2xl font-bold" :class="stat.color">{{ stat.value }}</p>
          <p class="text-xs text-muted-foreground">{{ stat.label }}</p>
        </div>
      </BijanCard>
    </div>

    <BijanCard>
      <BijanDataTable :columns :data="store.lines" :loading="store.loading" :page-size="10" />
    </BijanCard>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <BijanCard>
        <h2 class="mb-3 text-lg font-semibold">هشدارهای فعال</h2>
        <div class="space-y-3">
          <div v-for="line in store.lines.filter((l) => l.alerts.length > 0)" :key="line.id" class="rounded-lg border p-3">
            <div class="mb-2 flex items-center gap-2">
              <AlertTriangle class="h-4 w-4 text-amber-500" />
              <span class="text-sm font-medium">{{ line.name }}</span>
            </div>
            <div v-for="alert in line.alerts" :key="alert.id" class="mr-6">
              <BijanAlert :variant="alert.type === 'critical' ? 'destructive' : alert.type === 'warning' ? 'warning' : 'info'">
                <p class="text-sm">{{ alert.message }}</p>
              </BijanAlert>
            </div>
          </div>
          <p v-if="!store.lines.some((l) => l.alerts.length > 0)" class="text-center text-sm text-muted-foreground py-4">
            هیچ هشدار فعالی وجود ندارد
          </p>
        </div>
      </BijanCard>

      <BijanCard>
        <h2 class="mb-3 text-lg font-semibold">عملکرد خطوط</h2>
        <div class="space-y-4">
          <div v-for="line in store.lines" :key="line.id" class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">{{ line.name }}</span>
              <span class="text-xs text-muted-foreground">{{ line.efficiency }}%</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-muted">
              <div
                class="h-full rounded-full transition-all duration-500"
                :class="{
                  'bg-green-500': line.efficiency >= 85,
                  'bg-amber-500': line.efficiency >= 60 && line.efficiency < 85,
                  'bg-red-500': line.efficiency < 60,
                }"
                :style="{ width: `${Math.max(line.efficiency, 2)}%` }"
              />
            </div>
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>هدف: {{ line.dailyTarget.toLocaleString('fa-IR') }}</span>
              <span>تولید: {{ line.dailyAchieved.toLocaleString('fa-IR') }}</span>
            </div>
          </div>
        </div>
      </BijanCard>
    </div>
  </div>
</template>
