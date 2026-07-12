<script setup lang="ts">
import { ref } from 'vue'
import { User, Truck, Calendar, LogOut, ChevronLeft, Shield, HelpCircle, Moon, Sun } from 'lucide-vue-next'
import { useTheme } from '@bijan/ui'
import { useRouter } from 'vue-router'

const { isDark, toggle } = useTheme()
const router = useRouter()

const driver = ref({
  name: 'رضا مرادی',
  code: '۱۲۳۴',
  phone: '۰۹۱۲۳۴۵۶۷۸۹',
  vehicle: '۲۳ B ۴۵۶',
  vehicleType: 'کامیون ۱۰ تن',
  joinDate: '۱۴۰۲/۰۳/۱۵',
  totalTrips: 542,
  totalDistance: '145,000 km',
  rating: 4.8,
})

function handleLogout(): void {
  localStorage.removeItem('bijan-driver-token')
  localStorage.removeItem('bijan-driver')
  router.push('/login')
}
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-col items-center py-6">
      <div class="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-brand-red shadow-lg">
        <span class="text-3xl font-bold text-white">{{ driver.name.charAt(0) }}</span>
      </div>
      <h2 class="text-xl font-bold">{{ driver.name }}</h2>
      <p class="text-sm text-muted-foreground">{{ driver.vehicle }}</p>
      <div class="mt-2 flex items-center gap-1 text-sm">
        <span class="text-amber-500">★</span>
        <span class="font-semibold">{{ driver.rating }}</span>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-2">
      <div class="rounded-xl border bg-card p-3 text-center">
        <p class="text-lg font-bold">{{ driver.totalTrips }}</p>
        <p class="text-[10px] text-muted-foreground">سفرها</p>
      </div>
      <div class="rounded-xl border bg-card p-3 text-center">
        <p class="text-lg font-bold" dir="ltr">{{ driver.totalDistance }}</p>
        <p class="text-[10px] text-muted-foreground">مسافت</p>
      </div>
      <div class="rounded-xl border bg-card p-3 text-center">
        <p class="text-lg font-bold">{{ driver.rating }}</p>
        <p class="text-[10px] text-muted-foreground">امتیاز</p>
      </div>
    </div>

    <div class="rounded-xl border bg-card">
      <div class="divide-y">
        <div class="flex items-center justify-between p-4">
          <div class="flex items-center gap-3">
            <User class="h-5 w-5 text-muted-foreground" />
            <div>
              <p class="text-sm">کد راننده</p>
              <p class="text-xs text-muted-foreground">{{ driver.code }}</p>
            </div>
          </div>
          <ChevronLeft class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="flex items-center justify-between p-4">
          <div class="flex items-center gap-3">
            <Truck class="h-5 w-5 text-muted-foreground" />
            <div>
              <p class="text-sm">نوع خودرو</p>
              <p class="text-xs text-muted-foreground">{{ driver.vehicleType }}</p>
            </div>
          </div>
          <ChevronLeft class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="flex items-center justify-between p-4">
          <div class="flex items-center gap-3">
            <Calendar class="h-5 w-5 text-muted-foreground" />
            <div>
              <p class="text-sm">تاریخ شروع همکاری</p>
              <p class="text-xs text-muted-foreground">{{ driver.joinDate }}</p>
            </div>
          </div>
          <ChevronLeft class="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <button class="flex w-full items-center justify-between rounded-xl border bg-card p-4 active:scale-[0.99] transition-transform" @click="toggle">
        <div class="flex items-center gap-3">
          <component :is="isDark ? Sun : Moon" class="h-5 w-5 text-muted-foreground" />
          <span class="text-sm">{{ isDark ? 'حالت روشن' : 'حالت تاریک' }}</span>
        </div>
        <div class="h-6 w-11 rounded-full relative" :class="isDark ? 'bg-brand-red' : 'bg-muted'">
          <div class="h-5 w-5 rounded-full bg-white absolute top-0.5 shadow transition-all" :class="isDark ? 'left-0.5' : 'right-0.5'" />
        </div>
      </button>
    </div>

    <div class="rounded-xl border bg-card">
      <div class="divide-y">
        <button class="flex w-full items-center gap-3 p-4 text-sm active:scale-[0.99]">
          <HelpCircle class="h-5 w-5 text-muted-foreground" />
          راهنما
        </button>
        <button class="flex w-full items-center gap-3 p-4 text-sm active:scale-[0.99]">
          <Shield class="h-5 w-5 text-muted-foreground" />
          حریم خصوصی
        </button>
      </div>
    </div>

    <button
      class="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-medium text-red-600 active:scale-[0.98] transition-transform dark:border-red-900"
      @click="handleLogout"
    >
      <LogOut class="h-4 w-4" />
      خروج از حساب
    </button>
  </div>
</template>
