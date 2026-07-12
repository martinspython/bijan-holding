<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Navigation, Package, Clock, MapPin, AlertCircle, CheckCircle, ChevronLeft } from 'lucide-vue-next'

const driverInfo = ref({
  name: 'رضا مرادی',
  code: '۱۲۳۴',
  vehicle: '۲۳ B ۴۵۶',
  status: 'active',
  shiftStart: '۰۶:۰۰',
  shiftEnd: '۱۴:۰۰',
})

const currentTrip = ref({
  destination: 'اصفهان - انبار مرکزی',
  remainingDistance: '۱۸۵ km',
  estimatedArrival: '۱۰:۴۵',
  nextStop: 'کاشان - توقف بین راه',
  cargo: 'بیسکویت پتی بور - ۸,۵۰۰ بسته',
  temperature: '۲۲°C',
  progress: 65,
})

const todayStats = ref({
  deliveries: { done: 3, total: 8 },
  distance: 187,
  earnings: '۳,۴۵۰,۰۰۰',
  activeHours: '۴:۱۵',
})

const alerts = ref([
  { type: 'info' as const, message: 'تغییر مسیر به دلیل بسته بودن محور', time: '۱۵ دقیقه پیش' },
  { type: 'warning' as const, message: 'دمای محموله نزدیک به محدوده مجاز', time: '۳۲ دقیقه پیش' },
])

onMounted(() => {
  const stored = localStorage.getItem('bijan-driver')
  if (stored) {
    const parsed = JSON.parse(stored)
    driverInfo.value.name = parsed.name
  }
})
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center gap-4 rounded-xl border bg-card p-4">
      <div class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/10">
        <span class="text-lg font-bold text-brand-red">{{ driverInfo.name.charAt(0) }}</span>
      </div>
      <div class="flex-1">
        <h2 class="font-semibold text-base">{{ driverInfo.name }}</h2>
        <p class="text-xs text-muted-foreground">{{ driverInfo.vehicle }}</p>
        <div class="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock class="h-3 w-3" />
          <span>{{ driverInfo.shiftStart }} - {{ driverInfo.shiftEnd }}</span>
        </div>
      </div>
      <button class="rounded-lg p-2 text-muted-foreground" aria-label="جزئیات">
        <ChevronLeft class="h-5 w-5" />
      </button>
    </div>

    <div class="rounded-xl border bg-card p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold">مسیر فعلی</h3>
        <span class="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
          <Navigation class="h-3 w-3" />
          در حرکت
        </span>
      </div>
      <div class="mb-3 space-y-2">
        <div class="flex items-center gap-2 text-sm">
          <MapPin class="h-4 w-4 text-brand-red" />
          <span class="font-medium">{{ currentTrip.destination }}</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <Navigation class="h-3 w-3" />
          <span>باقی‌مانده: {{ currentTrip.remainingDistance }} - تخمین: {{ currentTrip.estimatedArrival }}</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <Package class="h-3 w-3" />
          <span>{{ currentTrip.cargo }}</span>
        </div>
      </div>
      <div class="h-2 overflow-hidden rounded-full bg-muted">
        <div class="h-full rounded-full bg-brand-red transition-all duration-700" :style="{ width: `${currentTrip.progress}%` }" />
      </div>
      <p class="mt-1 text-xs text-muted-foreground text-left">{{ currentTrip.progress }}% تکمیل</p>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div class="rounded-xl border bg-card p-3 text-center">
        <p class="text-xl font-bold text-brand-red">{{ todayStats.deliveries.done }}/{{ todayStats.deliveries.total }}</p>
        <p class="text-xs text-muted-foreground">تعداد تحویل</p>
      </div>
      <div class="rounded-xl border bg-card p-3 text-center">
        <p class="text-xl font-bold text-brand-green" dir="ltr">{{ todayStats.distance }} km</p>
        <p class="text-xs text-muted-foreground">مسافت طی شده</p>
      </div>
      <div class="rounded-xl border bg-card p-3 text-center">
        <p class="text-xl font-bold text-brand-gold">{{ todayStats.earnings }}</p>
        <p class="text-xs text-muted-foreground">درآمد امروز</p>
      </div>
      <div class="rounded-xl border bg-card p-3 text-center">
        <p class="text-xl font-bold">{{ todayStats.activeHours }}</p>
        <p class="text-xs text-muted-foreground">ساعت فعال</p>
      </div>
    </div>

    <div class="rounded-xl border bg-card p-4">
      <h3 class="mb-3 font-semibold">اعلان‌های مسیر</h3>
      <div class="space-y-2">
        <div v-for="(alert, i) in alerts" :key="i" class="flex items-start gap-3 rounded-lg border p-3 text-sm">
          <AlertCircle class="mt-0.5 h-4 w-4 shrink-0" :class="alert.type === 'warning' ? 'text-amber-500' : 'text-blue-500'" />
          <div class="flex-1 min-w-0">
            <p class="text-sm">{{ alert.message }}</p>
            <p class="text-xs text-muted-foreground">{{ alert.time }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <button class="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red py-3 text-sm font-semibold text-white active:scale-[0.98] transition-transform">
        <Navigation class="h-5 w-5" />
        شروع مسیر بعدی
      </button>
      <button class="flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium active:scale-[0.98] transition-transform">
        <CheckCircle class="h-5 w-5 text-green-600" />
        اتمام تحویل
      </button>
    </div>
  </div>
</template>
