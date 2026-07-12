<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { AlertTriangle } from 'lucide-vue-next'
import type { MovingVehicle } from './VehicleTracker'

interface Props {
  vehicles: MovingVehicle[]
  selectedVehicleId: string | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'select-vehicle': [id: string]
}>()

const mapContainer = ref<HTMLElement | null>(null)
const mapInstance = ref<any>(null)
const markersMap = ref<Record<string, any>>({})
const animationFrame = ref<number | null>(null)
const initError = ref<string | null>(null)
const mapLoaded = ref(false)

function vehicleIcon(color: string, selected: boolean): string {
  const size = selected ? 48 : 36
  const glow = selected ? `<circle cx="50" cy="50" r="52" fill="none" stroke="#FF6B35" stroke-width="3" stroke-dasharray="6,4" />` : ''
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill="${color}" stroke="white" stroke-width="4" />
    <polygon points="50,20 65,55 50,45 35,55" fill="white" />
    ${glow}
  </svg>`
}

let MaplibreMarker: any = null

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
      center: [53.0, 33.5],
      zoom: 6,
      minZoom: 5,
      maxZoom: 16,
    } as any)

    m.addControl(new maplibregl.NavigationControl(), 'top-left')
    m.addControl(new maplibregl.ScaleControl(), 'bottom-left')

    m.on('load', () => {
      mapLoaded.value = true
      updateMarkers(m)
      updateRoutes(m)
    })
    m.on('moveend', () => updateMarkers(m))
    m.on('error', (e: any) => {
      console.warn('MapLibre error:', e.error?.message || e)
    })

    mapInstance.value = m
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'خطا در بارگذاری نقشه'
    initError.value = msg
    console.warn('MapLibre init failed:', msg)
  }
}

function updateMarkers(m: any): void {
  if (!m || !m.getStyle()) return
  try {
    const currentIds = new Set(props.vehicles.filter((v) => v.status === 'moving').map((v) => v.id))
    Object.entries(markersMap.value).forEach(([id, marker]) => {
      if (!currentIds.has(id)) {
        marker.remove()
        delete markersMap.value[id]
      }
    })
    props.vehicles.filter((v) => v.status === 'moving').forEach((v) => {
      const existing = markersMap.value[v.id]
      if (existing) {
        existing.setLngLat([v.position.lng, v.position.lat])
        const el = existing.getElement()
        const svg = el.querySelector('svg')
        if (svg) {
          svg.style.transform = `rotate(${v.bearing}deg)`
          svg.style.transition = 'transform 0.5s ease'
        }
      } else {
        const markerColor = v.id === props.selectedVehicleId ? '#FF6B35' : '#C41E3A'
        const wrapper = document.createElement('div')
        wrapper.innerHTML = vehicleIcon(markerColor, v.id === props.selectedVehicleId)
        const el = wrapper.firstElementChild as HTMLElement
        el.style.cursor = 'pointer'
        el.addEventListener('click', () => emit('select-vehicle', v.id))
        if (!MaplibreMarker) return
        const marker = new MaplibreMarker({ element: el })
          .setLngLat([v.position.lng, v.position.lat])
          .addTo(m)
        markersMap.value[v.id] = marker
      }
    })
  } catch { }
}

function updateRoutes(m: any): void {
  if (!m || !m.getStyle()) return
  try {
    props.vehicles.filter((v) => v.route.length > 1).forEach((v) => {
      const sourceId = `route-${v.id}`
      const coords = v.route.map((p) => [p.lng, p.lat])
      const existingSource = m.getSource(sourceId)
      if (existingSource) {
        existingSource.setData({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords } })
      } else if (!m.getLayer(sourceId)) {
        m.addSource(sourceId, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords } } })
        m.addLayer({ id: sourceId, type: 'line', source: sourceId, paint: { 'line-color': '#D4AF37', 'line-width': 3, 'line-opacity': 0.6, 'line-dasharray': [2, 2] } } as any)
      }
    })
  } catch { }
}

function flyToVehicle(id: string): void {
  const v = props.vehicles.find((v) => v.id === id)
  const m = mapInstance.value
  if (v && m) {
    m.flyTo({ center: [v.position.lng, v.position.lat], zoom: 12, duration: 1500 })
  }
}

watch(() => props.selectedVehicleId, (id) => { if (id) flyToVehicle(id) })

function tick(): void {
  const m = mapInstance.value
  if (m && mapLoaded.value) {
    updateMarkers(m)
    updateRoutes(m)
  }
  if (!initError.value) {
    animationFrame.value = requestAnimationFrame(tick)
  }
}

onMounted(() => {
  initMap()
  animationFrame.value = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (animationFrame.value) cancelAnimationFrame(animationFrame.value)
  Object.values(markersMap.value).forEach((m) => { try { m.remove() } catch {} })
  markersMap.value = {}
  try { mapInstance.value?.remove() } catch {}
  mapInstance.value = null
})

const zoomLevel = computed(() => {
  try { return mapInstance.value?.getZoom()?.toFixed(1) ?? '-' } catch { return '-' }
})
</script>

<template>
  <div class="relative h-full w-full min-h-[500px] rounded-xl overflow-hidden border">
    <div v-if="initError" class="flex h-full items-center justify-center bg-muted/30">
      <div class="text-center p-8">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
          <AlertTriangle class="h-8 w-8 text-amber-500" />
        </div>
        <h3 class="text-lg font-semibold mb-2">بارگذاری نقشه با مشکل مواجه شد</h3>
        <p class="text-sm text-muted-foreground mb-4">{{ initError }}</p>
        <p class="text-xs text-muted-foreground">نمای لیست در دسترس است</p>
      </div>
    </div>

    <div v-else ref="mapContainer" class="h-full w-full" />

    <div v-if="!initError" class="absolute top-3 right-3 z-10 flex flex-col gap-2">
      <div class="rounded-lg bg-background/90 backdrop-blur px-3 py-2 text-xs shadow border">
        <div class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full bg-brand-red" />
          <span>{{ vehicles.filter((v) => v.status === 'moving').length }} خودرو فعال</span>
        </div>
      </div>
    </div>

    <div v-if="!initError" class="absolute bottom-3 left-3 z-10 rounded-lg bg-background/90 backdrop-blur px-2.5 py-1.5 text-[10px] text-muted-foreground shadow border">
      زوم: {{ zoomLevel }}
    </div>
  </div>
</template>
