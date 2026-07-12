<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useHRStore } from '../stores/hr'
import { BijanCard, BijanBadge, BijanStatusDot, BijanDataTable, } from '@bijan/ui'

const store = useHRStore()
onMounted(() => { store.fetchEmployees() })

const columns = [
  { key: 'name', label: 'نام', sortable: true },
  { key: 'position', label: 'سمت', sortable: true },
  { key: 'department', label: 'دپارتمان', sortable: true,
    render: (row: any) => row.department === 'production' ? 'تولید' : row.department === 'logistics' ? 'توزیع' : row.department === 'sales' ? 'فروش' : row.department === 'hr' ? 'منابع انسانی' : row.department === 'quality' ? 'کیفیت' : 'مالی' },
  { key: 'status', label: 'وضعیت', sortable: true,
    render: (row: any) => row.status === 'active' ? 'فعال' : row.status === 'on-leave' ? 'در مرخصی' : 'خاتمه همکاری' },
  { key: 'email', label: 'ایمیل' },
  { key: 'shift', label: 'شیفت', sortable: true,
    render: (row: any) => row.shift === 'morning' ? 'صبح' : row.shift === 'afternoon' ? 'بعدازظهر' : row.shift === 'night' ? 'شب' : 'چرخشی' },
]

const deptCount = computed(() => {
  const counts: Record<string, number> = {}
  store.employees.forEach((e) => { counts[e.department] = (counts[e.department] ?? 0) + 1 })
  return counts
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">منابع انسانی</h1>
      <p class="mt-1 text-sm text-muted-foreground">۴,۲۵۰ پرسنل - ۸ دپارتمان</p>
    </div>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <BijanCard padding="sm">
        <div class="text-center">
          <p class="text-2xl font-bold text-brand-red">{{ store.employees.length }}</p>
          <p class="text-xs text-muted-foreground">نمایش داده شده</p>
        </div>
      </BijanCard>
      <BijanCard padding="sm">
        <div class="text-center">
          <p class="text-2xl font-bold text-green-600">{{ store.employees.filter((e) => e.status === 'active').length }}</p>
          <p class="text-xs text-muted-foreground">فعال</p>
        </div>
      </BijanCard>
      <BijanCard padding="sm">
        <div class="text-center">
          <p class="text-2xl font-bold text-amber-500">{{ store.employees.filter((e) => e.status === 'on-leave').length }}</p>
          <p class="text-xs text-muted-foreground">در مرخصی</p>
        </div>
      </BijanCard>
      <BijanCard padding="sm">
        <div class="text-center">
          <p class="text-2xl font-bold text-red-500">{{ store.employees.filter((e) => e.status === 'terminated').length }}</p>
          <p class="text-xs text-muted-foreground">خاتمه همکاری</p>
        </div>
      </BijanCard>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-4">
      <BijanCard class="xl:col-span-1">
        <h2 class="mb-4 text-lg font-semibold">توزیع دپارتمانی</h2>
        <div class="space-y-3">
          <div v-for="(count, dept) in deptCount" :key="dept" class="flex items-center justify-between">
            <span class="text-sm">
              {{ dept === 'production' ? 'تولید' : dept === 'logistics' ? 'توزیع' : dept === 'sales' ? 'فروش' : dept === 'hr' ? 'منابع انسانی' : dept === 'quality' ? 'کیفیت' : dept === 'finance' ? 'مالی' : dept === 'executive' ? 'مدیریت' : 'نگهداری' }}
            </span>
            <span class="text-sm font-semibold">{{ count }}</span>
          </div>
        </div>
      </BijanCard>

      <BijanCard class="xl:col-span-3">
        <h2 class="mb-4 text-lg font-semibold">لیست پرسنل</h2>
        <BijanDataTable :columns :data="store.employees as any[]" :page-size="12" selectable />
      </BijanCard>
    </div>
  </div>
</template>
