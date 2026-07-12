<script setup lang="ts">
import { onMounted } from 'vue'
import { useFestivalStore } from '../stores/festival'
import { BijanCard, BijanBadge, BijanDataTable, BijanButton } from '@bijan/ui'
import { Store, MapPin, TrendingUp } from 'lucide-vue-next'

const store = useFestivalStore()
onMounted(() => { store.fetchStores() })

const columns = [
  { key: 'name', label: 'نام فروشگاه', sortable: true },
  { key: 'location', label: 'موقعیت', sortable: true },
  { key: 'status', label: 'وضعیت', sortable: true,
    render: (row: any) => row.status === 'operational' ? 'فعال' : row.status === 'construction' ? 'در حال ساخت' : 'برنامه‌ریزی شده' },
  { key: 'area', label: 'مساحت (m²)', sortable: true, align: 'left' as const },
  { key: 'employees', label: 'کارکنان', sortable: true, align: 'left' as const },
  { key: 'monthlyRevenue', label: 'درآمد ماهانه (ریال)', sortable: true, align: 'left' as const,
    render: (row: any) => row.monthlyRevenue ? `${(row.monthlyRevenue / 1e9).toFixed(1)} میلیارد` : '-' },
  { key: 'managerName', label: 'مدیر', sortable: true },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">فروشگاه‌های زنجیره‌ای</h1>
      <p class="mt-1 text-sm text-muted-foreground">از ۱۹ به ۱۶۰ فروشگاه در برنامه توسعه ۵ ساله</p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <BijanCard padding="sm">
        <div class="text-center">
          <p class="text-2xl font-bold text-brand-red">{{ store.stores.length }}</p>
          <p class="text-xs text-muted-foreground">کل فروشگاه‌ها</p>
        </div>
      </BijanCard>
      <BijanCard padding="sm">
        <div class="text-center">
          <p class="text-2xl font-bold text-green-600">{{ store.stores.filter((s) => s.status === 'operational').length }}</p>
          <p class="text-xs text-muted-foreground">فعال</p>
        </div>
      </BijanCard>
      <BijanCard padding="sm">
        <div class="text-center">
          <p class="text-2xl font-bold text-amber-500">{{ store.stores.filter((s) => s.status === 'construction').length }}</p>
          <p class="text-xs text-muted-foreground">در حال ساخت</p>
        </div>
      </BijanCard>
      <BijanCard padding="sm">
        <div class="text-center">
          <p class="text-2xl font-bold text-blue-500">{{ store.stores.filter((s) => s.status === 'planned').length }}</p>
          <p class="text-xs text-muted-foreground">برنامه‌ریزی شده</p>
        </div>
      </BijanCard>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <BijanCard class="xl:col-span-2">
        <BijanDataTable :columns :data="store.stores as any[]" :loading="store.loading" />
      </BijanCard>

      <BijanCard>
        <h2 class="mb-4 text-lg font-semibold">برنامه توسعه</h2>
        <div class="space-y-4">
          <div class="rounded-lg border bg-amber-50 dark:bg-amber-950/20 p-4">
            <div class="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <TrendingUp class="h-5 w-5" />
              <span class="text-sm font-semibold">هدف ۱۴۰۵</span>
            </div>
            <p class="mt-2 text-xs text-amber-600 dark:text-amber-400">
              افزایش از ۱۹ به ۴۵ فروشگاه فعال تا پایان سال
            </p>
          </div>

          <div class="space-y-2">
            <h3 class="text-sm font-medium">فروشگاه‌های در دست ساخت</h3>
            <div v-for="s in store.stores.filter((s) => s.status === 'construction')" :key="s.id" class="flex items-center gap-3 rounded-lg border p-3">
              <MapPin class="h-4 w-4 text-amber-500" />
              <div>
                <p class="text-sm font-medium">{{ s.name }}</p>
                <p class="text-xs text-muted-foreground">{{ s.location }} - {{ s.area }}m²</p>
              </div>
            </div>
          </div>
        </div>
      </BijanCard>
    </div>
  </div>
</template>
