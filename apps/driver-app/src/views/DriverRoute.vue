<script setup lang="ts">
import { ref } from 'vue'
import { MapPin, Navigation, Phone, MessageSquare } from 'lucide-vue-next'

interface RouteStop {
  id: number
  name: string
  type: string
  address: string
  checkIn: string
  status: 'done' | 'current' | 'pending'
}

const routeStops = ref<RouteStop[]>([
  { id: 1, name: 'انبار مرکزی تهران', type: 'origin', address: 'تهران، جاده خاوران', checkIn: '۰۶:۱۵', status: 'done' },
  { id: 2, name: 'توقف بین راه - کاشان', type: 'rest', address: 'کاشان، حاشیه آزادراه', checkIn: '۰۸:۳۰', status: 'current' },
  { id: 3, name: 'انبار اصفهان', type: 'destination', address: 'اصفهان، شهرک صنعتی', checkIn: '-', status: 'pending' },
  { id: 4, name: 'فروشگاه زنجیره‌ای اصفهان', type: 'delivery', address: 'اصفهان، چهارباغ', checkIn: '-', status: 'pending' },
])

const routeInfo = ref({
  totalDistance: '۴۵۰ km',
  estimatedTime: '۵:۳۰',
  currentLocation: 'کاشان',
  nextAction: 'توقف ۳۰ دقیقه‌ای',
})
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="rounded-xl border bg-card overflow-hidden">
      <div class="h-40 bg-gradient-to-br from-brand-red/20 to-brand-orange/20 flex items-center justify-center">
        <div class="text-center">
          <Navigation class="h-8 w-8 mx-auto text-brand-red mb-1" />
          <p class="text-sm font-semibold">تهران → اصفهان</p>
          <p class="text-xs text-muted-foreground">{{ routeInfo.totalDistance }} - {{ routeInfo.estimatedTime }}</p>
        </div>
      </div>
    </div>

    <div class="flex gap-3">
      <div class="flex-1 rounded-xl border bg-card p-3 text-center">
        <MapPin class="h-4 w-4 mx-auto text-brand-red mb-1" />
        <p class="text-xs font-medium">{{ routeInfo.currentLocation }}</p>
        <p class="text-[10px] text-muted-foreground">موقعیت فعلی</p>
      </div>
      <div class="flex-1 rounded-xl border bg-card p-3 text-center">
        <Navigation class="h-4 w-4 mx-auto text-brand-orange mb-1" />
        <p class="text-xs font-medium">{{ routeInfo.nextAction }}</p>
        <p class="text-[10px] text-muted-foreground">اقدام بعدی</p>
      </div>
    </div>

    <div class="rounded-xl border bg-card p-4">
      <h3 class="mb-3 font-semibold">ایستگاه‌های مسیر</h3>
      <div class="space-y-0">
        <div v-for="(stop, i) in routeStops" :key="stop.id" class="flex gap-3">
          <div class="flex flex-col items-center">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
              :class="{
                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300': stop.status === 'done',
                'bg-brand-red text-white': stop.status === 'current',
                'bg-muted text-muted-foreground': stop.status === 'pending',
              }"
            >
              {{ stop.status === 'done' ? '✓' : stop.id }}
            </div>
            <div v-if="i < routeStops.length - 1" class="mt-1 w-0.5 h-8 bg-border" />
          </div>
          <div class="flex-1 pb-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">{{ stop.name }}</p>
                <p class="text-xs text-muted-foreground">{{ stop.address }}</p>
              </div>
              <div class="text-left">
                <p class="text-xs font-medium" :class="stop.status === 'done' ? 'text-green-600' : stop.status === 'current' ? 'text-brand-red' : 'text-muted-foreground'">
                  {{ stop.status === 'done' ? stop.checkIn : stop.status === 'current' ? 'اکنون' : '-' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <button class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-medium text-white active:scale-[0.98] transition-transform">
        <Phone class="h-4 w-4" />
        تماس با مرکز
      </button>
      <button class="flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium active:scale-[0.98] transition-transform">
        <MessageSquare class="h-4 w-4" />
        پیام
      </button>
    </div>
  </div>
</template>
