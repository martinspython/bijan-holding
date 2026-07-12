<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { BijanCard, BijanBadge, BijanSkeleton } from '@bijan/ui'
import { useCommercialAnalyticsStore } from '../stores/analytics'
import {
  Globe, AlertTriangle, Ship, Truck, Package,
} from 'lucide-vue-next'

const store = useCommercialAnalyticsStore()
const mapError = ref<string | null>(null)
const mapLoaded = ref(false)
const mapContainer = ref<HTMLElement | null>(null)
let mapInstance: any = null
let MaplibreMarker: any = null
let isMounted = true

onMounted(async () => {
  store.fetchAll()
  await initMap()
})

onUnmounted(() => {
  isMounted = false
  if (mapInstance) {
    try { mapInstance.remove() } catch {}
    mapInstance = null
  }
})

async function initMap(): Promise<void> {
  if (!mapContainer.value) return
  try {
    const maplibregl = await import('maplibre-gl')
    await import('maplibre-gl/dist/maplibre-gl.css')
    MaplibreMarker = maplibregl.Marker

    const m = new maplibregl.Map({
      container: mapContainer.value,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors',
          },
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
      },
      center: [53.5, 33.0],
      zoom: 5.5,
      minZoom: 4,
      maxZoom: 14,
    } as any)

    m.addControl(new maplibregl.NavigationControl(), 'top-left')

    m.on('load', () => {
      if (!isMounted) return
      mapLoaded.value = true
      addNodes(m)
      addRoutes(m)
    })

    mapInstance = m
  } catch (err) {
    if (isMounted) {
      mapError.value = err instanceof Error ? err.message : 'خطا در بارگذاری نقشه'
    }
  }
}

function addNodes(m: any): void {
  store.supplyChainNodes.forEach((node) => {
    const color = node.riskLevel === 'low' ? '#2D5016' :
      node.riskLevel === 'medium' ? '#FF6B35' :
      node.riskLevel === 'high' ? '#C41E3A' : '#DC2626'
    const size = node.type === 'production' ? 18 : node.type === 'port' ? 14 : 12
    const pulse = node.status === 'disrupted' ? `<animate attributeName="r" values="${size};${size + 4};${size}" dur="2s" repeatCount="indefinite" />` : ''

    const el = document.createElement('div')
    el.innerHTML = `<svg width="${size + 10}" height="${size + 10}" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="${size}" fill="${color}" opacity="0.9" stroke="white" stroke-width="2">
        ${pulse}
      </circle>
      <text x="20" y="24" text-anchor="middle" fill="white" font-size="10" font-weight="bold">
        ${node.type === 'supplier' ? 'S' : node.type === 'warehouse' ? 'W' : node.type === 'production' ? 'P' : node.type === 'port' ? '⚓' : 'D'}
      </text>
    </svg>`
    const elDiv = el.firstElementChild as HTMLElement
    elDiv.style.cursor = 'pointer'
    elDiv.title = `${node.name} - بار: ${node.load}%`

    if (!MaplibreMarker) return
    new MaplibreMarker({ element: elDiv })
      .setLngLat([node.lng, node.lat])
      .addTo(m)
  })
}

function addRoutes(m: any): void {
  store.supplyChainRoutes.forEach((route) => {
    const from = store.supplyChainNodes.find((n) => n.id === route.fromId)
    const to = store.supplyChainNodes.find((n) => n.id === route.toId)
    if (!from || !to) return

    const color = route.status === 'active' ? '#2D5016' :
      route.status === 'delayed' ? '#FF6B35' : '#DC2626'

    m.addSource(`route-${route.id}`, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [[from.lng, from.lat], [to.lng, to.lat]],
        },
      },
    } as any)
    m.addLayer({
      id: `route-${route.id}`,
      type: 'line',
      source: `route-${route.id}`,
      paint: {
        'line-color': color,
        'line-width': route.status === 'disrupted' ? 4 : 2.5,
        'line-opacity': route.status === 'disrupted' ? 0.8 : 0.5,
        'line-dasharray': route.status === 'disrupted' ? [4, 4] : [1, 0],
      },
    } as any)
  })
}

const disruptedCount = computed(() =>
  store.supplyChainRoutes.filter((r) => r.status === 'disrupted').length +
  store.supplyChainNodes.filter((n) => n.status === 'disrupted').length,
)

const disruptedNodes = computed(() =>
  store.supplyChainNodes.filter((n) => n.status === 'disrupted' || n.riskLevel === 'high' || n.riskLevel === 'critical'),
)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">زنجیره تأمین</h1>
      <p class="mt-1 text-sm text-muted-foreground">نقشه تعاملی زنجیره تأمین بیژن هولدینگ</p>
    </div>

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div class="rounded-lg border p-2.5 text-center">
        <p class="text-lg font-bold">{{ store.supplyChainNodes.length }}</p>
        <p class="text-[10px] text-muted-foreground">گره فعال</p>
      </div>
      <div class="rounded-lg border p-2.5 text-center">
        <p class="text-lg font-bold">{{ store.supplyChainRoutes.length }}</p>
        <p class="text-[10px] text-muted-foreground">مسیر لجستیک</p>
      </div>
      <div class="rounded-lg border p-2.5 text-center">
        <p class="text-lg font-bold text-amber-500">{{ disruptedCount }}</p>
        <p class="text-[10px] text-muted-foreground">اختلال فعال</p>
      </div>
      <div class="rounded-lg border p-2.5 text-center">
        <p class="text-lg font-bold text-green-600">۸۴٪</p>
        <p class="text-[10px] text-muted-foreground">سلامت زنجیره</p>
      </div>
    </div>

    <div v-if="mapError" class="rounded-xl border bg-amber-50 dark:bg-amber-900/20 p-6 text-center">
      <AlertTriangle class="mx-auto mb-2 h-8 w-8 text-amber-500" />
      <p class="font-semibold">خطا در بارگذاری نقشه</p>
      <p class="text-sm text-muted-foreground">{{ mapError }}</p>
    </div>

    <div v-else ref="mapContainer" class="h-[500px] w-full rounded-xl border overflow-hidden" />

    <div v-if="disruptedNodes.length" class="space-y-2">
      <h3 class="text-sm font-semibold flex items-center gap-1">
        <AlertTriangle class="h-4 w-4 text-red-500" />
        گره‌های دارای ریسک
      </h3>
      <div v-for="node in disruptedNodes" :key="node.id"
        class="flex items-center justify-between rounded-lg border p-3">
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-full"
            :class="node.riskLevel === 'high' || node.riskLevel === 'critical' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-amber-100 dark:bg-amber-900/30'">
            <Package class="h-4 w-4"
              :class="node.riskLevel === 'high' || node.riskLevel === 'critical' ? 'text-red-500' : 'text-amber-500'" />
          </div>
          <div>
            <p class="text-sm font-medium">{{ node.name }}</p>
            <p class="text-[10px] text-muted-foreground">بار: {{ node.load }}% از {{ node.capacity }}%</p>
          </div>
        </div>
        <BijanBadge :variant="node.riskLevel === 'low' ? 'success' : node.riskLevel === 'medium' ? 'warning' : 'error'" size="sm">
          {{ node.riskLevel === 'low' ? 'ریسک کم' : node.riskLevel === 'medium' ? 'ریسک متوسط' : 'ریسک بالا' }}
        </BijanBadge>
      </div>
    </div>
  </div>
</template>
