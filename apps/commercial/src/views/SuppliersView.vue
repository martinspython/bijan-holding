<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { BijanCard, BijanBadge, BijanSearchInput, BijanSkeleton } from '@bijan/ui'
import { useSupplierStore } from '../stores/suppliers'
import type { Supplier } from '../types/commercial'
import {
  Building2, MapPin, Phone, Mail, Globe, Shield, Star, TrendingUp,
  AlertTriangle, CheckCircle, XCircle, ChevronLeft, Search,
} from 'lucide-vue-next'

const store = useSupplierStore()
const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)
const selectedRisk = ref<string | null>(null)

onMounted(() => { store.fetchSuppliers() })

const categories = computed(() =>
  [...new Set(store.suppliers.map((s) => s.category))],
)

const filteredSuppliers = computed(() => {
  let result = store.suppliers
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((s) =>
      s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.city.toLowerCase().includes(q),
    )
  }
  if (selectedCategory.value) {
    result = result.filter((s) => s.category === selectedCategory.value)
  }
  if (selectedRisk.value) {
    result = result.filter((s) => s.riskLevel === selectedRisk.value)
  }
  return result
})

const riskBadgeVariant = (level: string) => {
  switch (level) {
    case 'low': return 'success' as const
    case 'medium': return 'warning' as const
    case 'high': return 'destructive' as const
    case 'critical': return 'destructive' as const
    default: return 'default' as const
  }
}

const statusVariant = (status: string) => {
  switch (status) {
    case 'active': return 'success' as const
    case 'inactive': return 'default' as const
    case 'blacklisted': return 'destructive' as const
    case 'pending': return 'warning' as const
    default: return 'default' as const
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">تأمین‌کنندگان</h1>
      <p class="mt-1 text-sm text-muted-foreground">مدیریت و ارزیابی {{ store.suppliers.length }} تأمین‌کننده</p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <div class="relative flex-1 min-w-[200px] max-w-sm">
        <Search class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input v-model="searchQuery" type="text" placeholder="جستجوی تأمین‌کننده..."
          class="h-10 w-full rounded-lg border bg-background pr-10 pl-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="جستجوی تأمین‌کننده" />
      </div>
      <select v-model="selectedCategory"
        class="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="فیلتر دسته‌بندی">
        <option :value="null">همه دسته‌بندی‌ها</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <select v-model="selectedRisk"
        class="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="فیلتر ریسک">
        <option :value="null">همه سطوح ریسک</option>
        <option value="low">ریسک کم</option>
        <option value="medium">ریسک متوسط</option>
        <option value="high">ریسک بالا</option>
        <option value="critical">ریسک بحرانی</option>
      </select>
    </div>

    <div v-if="store.loading" class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <BijanSkeleton v-for="i in 6" :key="i" variant="card" height="240px" />
    </div>

    <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="supplier in filteredSuppliers" :key="supplier.id"
        class="rounded-xl border bg-card p-4 transition-all hover:shadow-md"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full"
              :class="supplier.riskLevel === 'low' ? 'bg-green-100 dark:bg-green-900/30' :
                supplier.riskLevel === 'high' || supplier.riskLevel === 'critical' ? 'bg-red-100 dark:bg-red-900/30' :
                'bg-amber-100 dark:bg-amber-900/30'">
              <Building2 class="h-5 w-5"
                :class="supplier.riskLevel === 'low' ? 'text-green-600' :
                  supplier.riskLevel === 'high' || supplier.riskLevel === 'critical' ? 'text-red-500' :
                  'text-amber-500'" />
            </div>
            <div>
              <p class="text-sm font-semibold">{{ supplier.name }}</p>
              <p class="text-[10px] text-muted-foreground">{{ supplier.code }}</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <Star class="h-3.5 w-3.5 text-brand-gold fill-current" />
            <span class="text-xs font-medium">{{ supplier.rating }}</span>
          </div>
        </div>

        <div class="mb-3 flex flex-wrap gap-1.5">
          <BijanBadge :variant="statusVariant(supplier.status)" size="sm">
            {{ supplier.status === 'active' ? 'فعال' : supplier.status === 'inactive' ? 'غیرفعال' : supplier.status === 'blacklisted' ? 'لیست سیاه' : 'در انتظار' }}
          </BijanBadge>
          <BijanBadge :variant="riskBadgeVariant(supplier.riskLevel)" size="sm">
            <Shield class="h-3 w-3 ml-1" />
            {{ supplier.riskLevel === 'low' ? 'ریسک کم' : supplier.riskLevel === 'medium' ? 'ریسک متوسط' : supplier.riskLevel === 'high' ? 'ریسک بالا' : 'بحرانی' }}
          </BijanBadge>
          <BijanBadge variant="default" size="sm">{{ supplier.category }}</BijanBadge>
        </div>

        <div class="space-y-1.5 text-xs text-muted-foreground">
          <div class="flex items-center gap-2">
            <MapPin class="h-3.5 w-3.5 shrink-0" />
            <span>{{ supplier.city }}، {{ supplier.country }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Phone class="h-3.5 w-3.5 shrink-0" />
            <span dir="ltr">{{ supplier.contactPhone }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Mail class="h-3.5 w-3.5 shrink-0" />
            <span class="truncate">{{ supplier.contactEmail }}</span>
          </div>
        </div>

        <div class="mt-3 grid grid-cols-3 gap-2 border-t pt-3">
          <div class="text-center">
            <p class="text-sm font-bold">{{ supplier.reliability }}%</p>
            <p class="text-[10px] text-muted-foreground">قابلیت اعتماد</p>
          </div>
          <div class="text-center">
            <p class="text-sm font-bold">{{ supplier.qualityScore }}%</p>
            <p class="text-[10px] text-muted-foreground">کیفیت</p>
          </div>
          <div class="text-center">
            <p class="text-sm font-bold">{{ supplier.complianceScore }}%</p>
            <p class="text-[10px] text-muted-foreground">انطباق</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
