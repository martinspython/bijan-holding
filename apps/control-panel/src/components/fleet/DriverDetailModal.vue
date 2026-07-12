<script setup lang="ts">
import { computed } from 'vue'
import { BijanCard, BijanBadge, BijanModal } from '@bijan/ui'
import { Truck, MapPin, Navigation, Clock, Thermometer, Fuel, Phone, User, Gauge } from 'lucide-vue-next'
import type { MovingVehicle } from './VehicleTracker'

interface Props {
  vehicle: MovingVehicle | null
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  focus: []
}>()

const vehicle = computed(() => props.vehicle)

const progressPercent = computed(() => {
  if (!vehicle.value) return 0
  return Math.round(vehicle.value.routeProgress * 100)
})
</script>

<template>
  <BijanModal :open="open" title="جزئیات خودرو" size="lg" @close="emit('close')">
    <template v-if="vehicle">
      <div class="space-y-4">
        <div class="flex items-center gap-4 rounded-xl border bg-card p-4">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10">
            <Truck class="h-8 w-8 text-brand-red" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold">{{ vehicle.driverName }}</h3>
            <p class="text-sm text-muted-foreground">{{ vehicle.plateNumber }}</p>
            <div class="mt-1 flex items-center gap-2">
              <span class="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <Navigation class="h-3 w-3" />
                در حرکت
              </span>
              <span class="text-xs text-muted-foreground">{{ vehicle.destination }}</span>
            </div>
          </div>
          <button
            class="rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark active:scale-95"
            @click="emit('focus')"
          >
            نمایش روی نقشه
          </button>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border p-3">
            <div class="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <Gauge class="h-3.5 w-3.5" />
              <span>سرعت</span>
            </div>
            <p class="text-lg font-bold" dir="ltr">{{ vehicle.speed }} km/h</p>
          </div>
          <div class="rounded-lg border p-3">
            <div class="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <Clock class="h-3.5 w-3.5" />
              <span>تخمین رسیدن</span>
            </div>
            <p class="text-lg font-bold">{{ vehicle.eta }}</p>
          </div>
          <div class="rounded-lg border p-3">
            <div class="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <MapPin class="h-3.5 w-3.5" />
              <span>موقعیت</span>
            </div>
            <p class="text-sm font-medium" dir="ltr">
              {{ vehicle.position.lat.toFixed(4) }}, {{ vehicle.position.lng.toFixed(4) }}
            </p>
          </div>
          <div class="rounded-lg border p-3">
            <div class="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <Navigation class="h-3.5 w-3.5" />
              <span>مسیر</span>
            </div>
            <p class="text-sm font-medium">{{ vehicle.destination }}</p>
          </div>
        </div>

        <div class="rounded-lg border p-4">
          <div class="mb-2 flex items-center justify-between">
            <span class="text-sm font-medium">پیشرفت مسیر</span>
            <span class="text-sm font-bold text-brand-red">{{ progressPercent }}%</span>
          </div>
          <div class="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              class="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-orange transition-all duration-500"
              :style="{ width: `${progressPercent}%` }"
            />
          </div>
          <div class="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>مبدا</span>
            <span>مقصد</span>
          </div>
        </div>

        <div class="flex gap-2">
          <button class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white active:scale-[0.98]">
            <Phone class="h-4 w-4" />
            تماس با راننده
          </button>
          <button class="flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium active:scale-[0.98]">
            <User class="h-4 w-4" />
            مشاهده پروفایل
          </button>
        </div>
      </div>
    </template>
  </BijanModal>
</template>
