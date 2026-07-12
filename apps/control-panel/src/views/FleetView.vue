<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { BijanCard, BijanBadge, BijanSearchInput } from '@bijan/ui'
import { Map, List, Navigation, MapPin, Gauge, Clock, Search, Filter, TrendingUp, ChevronLeft, Eye } from 'lucide-vue-next'
import FleetMapView from '../components/fleet/FleetMapView.vue'
import DriverDetailModal from '../components/fleet/DriverDetailModal.vue'
import { createMovingVehicles, updateVehiclePosition, type MovingVehicle } from '../components/fleet/VehicleTracker'

const viewMode = ref<'list' | 'map'>('map')
const selectedVehicleId = ref<string | null>(null)
const searchQuery = ref('')
const showDetailModal = ref(false)
const selectedVehicle = ref<MovingVehicle | null>(null)

const vehicles = ref<MovingVehicle[]>([])
const staticVehicles = ref([
  { id: 'static-1', plateNumber: '۴۵ B ۶۷۸', driverName: 'علی محمدی', status: 'idle' as const, location: 'تهران، انبار مرکزی', fuelLevel: 65, lastMaintenance: '۱۴۰۵/۰۳/۲۸' },
  { id: 'static-2', plateNumber: '۵۶ B ۷۸۹', driverName: 'محمد رضایی', status: 'parked' as const, location: 'اصفهان، شهرک صنعتی', fuelLevel: 42, lastMaintenance: '۱۴۰۵/۰۲/۱۵' },
  { id: 'static-3', plateNumber: '۶۷ B ۸۹۰', driverName: 'احمد کریمی', status: 'maintenance' as const, location: 'تهران، تعمیرگاه مرکزی', fuelLevel: 18, lastMaintenance: '۱۴۰۵/۰۴/۰۱' },
  { id: 'static-4', plateNumber: '۷۸ B ۹۰۱', driverName: 'حسین نوری', status: 'idle' as const, location: 'شیراز، پایانه', fuelLevel: 90, lastMaintenance: '۱۴۰۵/۰۳/۱۰' },
  { id: 'static-5', plateNumber: '۸۹ B ۰۱۲', driverName: 'مهدی حسینی', status: 'parked' as const, location: 'مشهد، انبار شرق', fuelLevel: 55, lastMaintenance: '۱۴۰۵/۰۱/۲۰' },
])

const filteredVehicles = computed(() => {
  if (!searchQuery.value) return vehicles.value
  const q = searchQuery.value.toLowerCase()
  return vehicles.value.filter(
    (v) =>
      v.driverName.toLowerCase().includes(q) ||
      v.plateNumber.includes(q) ||
      v.destination.toLowerCase().includes(q),
  )
})

const allMovingVehicles = computed(() => filteredVehicles.value.filter((v) => v.status === 'moving'))
const idleCount = computed(() => vehicles.value.filter((v) => v.status !== 'moving').length + staticVehicles.value.filter((v) => v.status === 'idle' || v.status === 'parked').length)
const maintenanceCount = computed(() => staticVehicles.value.filter((v) => v.status === 'maintenance').length)

let intervalId: ReturnType<typeof setInterval> | null = null
let tickInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  vehicles.value = createMovingVehicles(30)

  tickInterval = setInterval(() => {
    vehicles.value = vehicles.value.map((v) => updateVehiclePosition(v, 1500))
  }, 1500)
})

onUnmounted(() => {
  if (tickInterval) clearInterval(tickInterval)
  if (intervalId) clearInterval(intervalId)
})

function selectVehicle(id: string): void {
  selectedVehicleId.value = id
  const v = vehicles.value.find((v) => v.id === id)
  if (v) {
    selectedVehicle.value = v
    showDetailModal.value = true
  }
}

function focusOnMap(): void {
  showDetailModal.value = false
  viewMode.value = 'map'
}

const statusLabel: Record<string, string> = {
  moving: 'در حرکت',
  idle: 'متوقف',
  parked: 'پارک',
  maintenance: 'تعمیرات',
}

const statusColor: Record<string, string> = {
  moving: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300',
  idle: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300',
  parked: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300',
  maintenance: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300',
}
</script>

<template>
  <div class="flex h-[calc(100vh-7rem)] gap-4">
    <div class="flex w-full flex-col gap-4 lg:w-96 xl:w-[420px]">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold">ناوگان</h1>
          <p class="text-xs text-muted-foreground">{{ vehicles.filter((v) => v.status === 'moving').length }} خودرو فعال از {{ vehicles.length + staticVehicles.length }}</p>
        </div>
        <div class="flex gap-1 rounded-lg border p-0.5">
          <button
            class="rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
            :class="viewMode === 'map' ? 'bg-brand-red text-white' : 'text-muted-foreground hover:text-foreground'"
            @click="viewMode = 'map'"
            aria-label="نمایش نقشه"
          >
            <Map class="h-3.5 w-3.5" />
          </button>
          <button
            class="rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
            :class="viewMode === 'list' ? 'bg-brand-red text-white' : 'text-muted-foreground hover:text-foreground'"
            @click="viewMode = 'list'"
            aria-label="نمایش لیست"
          >
            <List class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2">
        <div class="rounded-lg border p-2.5 text-center">
          <p class="text-lg font-bold text-green-600">{{ vehicles.filter((v) => v.status === 'moving').length }}</p>
          <p class="text-[10px] text-muted-foreground">در حرکت</p>
        </div>
        <div class="rounded-lg border p-2.5 text-center">
          <p class="text-lg font-bold text-amber-500">{{ idleCount }}</p>
          <p class="text-[10px] text-muted-foreground">متوقف</p>
        </div>
        <div class="rounded-lg border p-2.5 text-center">
          <p class="text-lg font-bold text-red-500">{{ maintenanceCount }}</p>
          <p class="text-[10px] text-muted-foreground">تعمیرات</p>
        </div>
      </div>

      <div class="relative">
        <Search class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="جستجوی راننده، پلاک، مسیر..."
          class="h-10 w-full rounded-lg border bg-background pr-10 pl-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="جستجوی ناوگان"
        />
      </div>

      <div class="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
        <div v-for="v in filteredVehicles.filter((v) => v.status === 'moving')" :key="v.id">
          <button
            class="w-full rounded-xl border bg-card p-3 text-right transition-all hover:shadow-md active:scale-[0.99]"
            :class="selectedVehicleId === v.id ? 'ring-2 ring-brand-red' : ''"
            @click="selectVehicle(v.id)"
          >
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red/10">
                <Navigation class="h-5 w-5 text-brand-red" :style="{ transform: `rotate(${v.bearing}deg)` }" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold truncate">{{ v.driverName }}</p>
                  <span class="shrink-0 text-[10px] text-green-600">live</span>
                </div>
                <p class="text-xs text-muted-foreground truncate">{{ v.plateNumber }} - {{ v.destination }}</p>
                <div class="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span class="flex items-center gap-1">
                    <Gauge class="h-3 w-3" />{{ v.speed }} km/h
                  </span>
                  <span class="flex items-center gap-1">
                    <Clock class="h-3 w-3" />{{ v.eta }}
                  </span>
                </div>
              </div>
              <ChevronLeft class="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
            <div class="mt-2 h-1 overflow-hidden rounded-full bg-muted">
              <div class="h-full rounded-full bg-brand-red transition-all duration-500" :style="{ width: `${v.routeProgress * 100}%` }" />
            </div>
          </button>
        </div>

        <div class="pt-2">
          <p class="text-xs font-medium text-muted-foreground mb-2">خودروهای غیرفعال</p>
          <div v-for="v in staticVehicles" :key="v.id">
            <div class="w-full rounded-xl border bg-card p-3 mb-2">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <MapPin class="h-5 w-5 text-muted-foreground" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-semibold truncate">{{ v.driverName }}</p>
                    <span class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium" :class="statusColor[v.status]">
                      {{ statusLabel[v.status] }}
                    </span>
                  </div>
                  <p class="text-xs text-muted-foreground truncate">{{ v.plateNumber }}</p>
                  <p class="text-[10px] text-muted-foreground">{{ v.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="viewMode === 'map'" class="hidden lg:flex flex-1">
      <FleetMapView
        :vehicles="vehicles"
        :selected-vehicle-id="selectedVehicleId"
        @select-vehicle="selectVehicle"
      />
    </div>
  </div>

  <DriverDetailModal
    :vehicle="selectedVehicle"
    :open="showDetailModal"
    @close="showDetailModal = false"
    @focus="focusOnMap"
  />
</template>
