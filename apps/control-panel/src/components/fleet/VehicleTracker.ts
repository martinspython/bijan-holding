import type { GeoLocation } from '@bijan/types'

export interface RoutePoint {
  lng: number
  lat: number
}

export interface MovingVehicle {
  id: string
  plateNumber: string
  driverName: string
  position: { lng: number; lat: number }
  bearing: number
  speed: number
  route: RoutePoint[]
  routeProgress: number
  destination: string
  eta: string
  status: 'moving' | 'idle'
}

const routes: Record<string, RoutePoint[]> = {
  'tehran-isfahan': [
    { lng: 51.389, lat: 35.6892 },
    { lng: 51.5, lat: 35.6 },
    { lng: 51.8, lat: 35.3 },
    { lng: 52.0, lat: 35.0 },
    { lng: 52.3, lat: 34.8 },
    { lng: 52.5, lat: 34.6 },
    { lng: 52.8, lat: 34.4 },
    { lng: 53.0, lat: 34.2 },
    { lng: 53.3, lat: 34.0 },
    { lng: 53.5, lat: 33.8 },
    { lng: 53.8, lat: 33.6 },
    { lng: 54.0, lat: 33.4 },
    { lng: 54.3, lat: 33.2 },
    { lng: 54.5, lat: 33.0 },
    { lng: 54.8, lat: 32.8 },
    { lng: 55.0, lat: 32.6 },
  ],
  'tehran-mashhad': [
    { lng: 51.389, lat: 35.6892 },
    { lng: 52.0, lat: 35.8 },
    { lng: 52.5, lat: 35.9 },
    { lng: 53.0, lat: 36.0 },
    { lng: 53.5, lat: 36.1 },
    { lng: 54.0, lat: 36.2 },
    { lng: 54.5, lat: 36.3 },
    { lng: 55.0, lat: 36.4 },
    { lng: 55.5, lat: 36.5 },
    { lng: 56.0, lat: 36.6 },
    { lng: 56.5, lat: 36.5 },
    { lng: 57.0, lat: 36.4 },
    { lng: 57.5, lat: 36.3 },
    { lng: 58.0, lat: 36.2 },
    { lng: 58.5, lat: 36.3 },
    { lng: 59.0, lat: 36.4 },
    { lng: 59.5, lat: 36.3 },
    { lng: 60.0, lat: 36.2 },
  ],
  'isfahan-shiraz': [
    { lng: 51.389, lat: 32.6892 },
    { lng: 51.8, lat: 32.4 },
    { lng: 52.0, lat: 32.0 },
    { lng: 52.3, lat: 31.6 },
    { lng: 52.5, lat: 31.2 },
    { lng: 52.8, lat: 30.8 },
    { lng: 53.0, lat: 30.4 },
    { lng: 53.3, lat: 30.0 },
    { lng: 53.5, lat: 29.8 },
    { lng: 53.6, lat: 29.6 },
    { lng: 53.7, lat: 29.5 },
  ],
  'tehran-tabriz': [
    { lng: 51.389, lat: 35.6892 },
    { lng: 51.0, lat: 35.8 },
    { lng: 50.5, lat: 36.0 },
    { lng: 50.0, lat: 36.2 },
    { lng: 49.5, lat: 36.5 },
    { lng: 49.0, lat: 36.7 },
    { lng: 48.5, lat: 36.9 },
    { lng: 48.0, lat: 37.2 },
    { lng: 47.5, lat: 37.5 },
    { lng: 47.0, lat: 37.8 },
    { lng: 46.5, lat: 38.0 },
    { lng: 46.3, lat: 38.1 },
  ],
  'mashhad-ahvaz': [
    { lng: 59.5, lat: 36.3 },
    { lng: 59.0, lat: 36.0 },
    { lng: 58.5, lat: 35.5 },
    { lng: 58.0, lat: 35.0 },
    { lng: 57.5, lat: 34.5 },
    { lng: 57.0, lat: 34.0 },
    { lng: 56.5, lat: 33.5 },
    { lng: 56.0, lat: 33.0 },
    { lng: 55.5, lat: 32.5 },
    { lng: 55.0, lat: 32.0 },
    { lng: 54.5, lat: 31.5 },
    { lng: 54.0, lat: 31.0 },
    { lng: 53.5, lat: 30.5 },
    { lng: 53.0, lat: 30.0 },
    { lng: 52.5, lat: 29.8 },
    { lng: 52.0, lat: 29.5 },
    { lng: 51.5, lat: 29.2 },
    { lng: 51.0, lat: 29.0 },
    { lng: 50.5, lat: 29.0 },
    { lng: 50.0, lat: 29.0 },
    { lng: 49.5, lat: 29.2 },
    { lng: 49.0, lat: 29.5 },
    { lng: 48.7, lat: 29.7 },
  ],
  'shiraz-bandarabbas': [
    { lng: 53.7, lat: 29.5 },
    { lng: 54.0, lat: 29.0 },
    { lng: 54.5, lat: 28.5 },
    { lng: 55.0, lat: 28.0 },
    { lng: 55.5, lat: 27.7 },
    { lng: 56.0, lat: 27.3 },
    { lng: 56.5, lat: 27.2 },
    { lng: 57.0, lat: 27.0 },
    { lng: 57.5, lat: 26.8 },
    { lng: 58.0, lat: 26.6 },
    { lng: 58.5, lat: 26.5 },
    { lng: 59.0, lat: 26.4 },
    { lng: 59.5, lat: 26.5 },
    { lng: 60.0, lat: 26.6 },
  ],
}

const routeNames: Record<string, string> = {
  'tehran-isfahan': 'تهران → اصفهان',
  'tehran-mashhad': 'تهران → مشهد',
  'isfahan-shiraz': 'اصفهان → شیراز',
  'tehran-tabriz': 'تهران → تبریز',
  'mashhad-ahvaz': 'مشهد → اهواز',
  'shiraz-bandarabbas': 'شیراز → بندرعباس',
}

const driverNames = ['رضا مرادی', 'امیر حسینی', 'سعید کریمی', 'مجتبی نوری', 'حمید رضایی', 'علی اکبری', 'محمد رستمی', 'حسن رضایی', 'نرگس امینی', 'سارا احمدی']
const plates = ['۱۲B۳۴۵', '۲۳B۴۵۶', '۳۴B۵۶۷', '۴۵B۶۷۸', '۵۶B۷۸۹', '۶۷B۸۹۰', '۷۸B۹۰۱', '۸۹B۰۱۲', '۹۰B۱۲۳', '۰۱B۲۳۴']

function generatePlate(idx: number): string {
  return `${String(10 + idx).padStart(2, '0')} B ${String(300 + idx).padStart(3, '0')}`
}

export function createMovingVehicles(count: number = 25): MovingVehicle[] {
  const routeKeys = Object.keys(routes)
  const vehicles: MovingVehicle[] = []

  for (let i = 0; i < count; i++) {
    const routeKey = routeKeys[i % routeKeys.length]!
    const routePoints = routes[routeKey]!
    const startProgress = Math.random() * 0.8
    const startIdx = Math.max(0, Math.floor(startProgress * (routePoints.length - 1)))
    const pos = routePoints[startIdx]!

    const nextPos = routePoints[Math.min(startIdx + 1, routePoints.length - 1)]!
    const bearing = calculateBearing(pos.lat, pos.lng, nextPos.lat, nextPos.lng)

    const distKm = distanceBetween(
      routePoints[0]!.lat, routePoints[0]!.lng,
      routePoints[routePoints.length - 1]!.lat, routePoints[routePoints.length - 1]!.lng,
    )
    const avgSpeed = 50 + Math.random() * 30
    const etaHours = (distKm * (1 - startProgress)) / avgSpeed

    vehicles.push({
      id: `live-${i + 1}`,
      plateNumber: generatePlate(i),
      driverName: driverNames[i % driverNames.length]!,
      position: { lng: pos.lng, lat: pos.lat },
      bearing,
      speed: Math.round(avgSpeed + (Math.random() - 0.5) * 15),
      route: routePoints,
      routeProgress: startProgress,
      destination: routeNames[routeKey]!,
      eta: formatEta(etaHours),
      status: 'moving',
    })
  }

  return vehicles
}

export function updateVehiclePosition(v: MovingVehicle, deltaMs: number): MovingVehicle {
  if (v.status === 'idle') return v

  const speedKmh = v.speed
  const deltaHours = deltaMs / 3600000
  const distanceKm = speedKmh * deltaHours * 0.15

  const totalRouteKm = totalRouteDistance(v.route)
  if (totalRouteKm === 0) return v

  const progressPerMs = distanceKm / totalRouteKm
  let newProgress = v.routeProgress + progressPerMs

  if (newProgress >= 1) {
    newProgress = 1
    return { ...v, routeProgress: 1, status: 'idle', speed: 0 }
  }

  const pos = getPointOnRoute(v.route, newProgress)
  const nextPos = getPointOnRoute(v.route, Math.min(newProgress + 0.02, 1))
  const bearing = calculateBearing(pos.lat, pos.lng, nextPos.lat, nextPos.lng)

  const remainingKm = totalRouteKm * (1 - newProgress)
  const etaHours = remainingKm / speedKmh

  return {
    ...v,
    position: { lng: pos.lng, lat: pos.lat },
    bearing,
    routeProgress: newProgress,
    eta: formatEta(etaHours),
  }
}

function calculateBearing(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const lat1Rad = (lat1 * Math.PI) / 180
  const lat2Rad = (lat2 * Math.PI) / 180
  const y = Math.sin(dLng) * Math.cos(lat2Rad)
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng)
  const bearing = (Math.atan2(y, x) * 180) / Math.PI
  return (bearing + 360) % 360
}

function distanceBetween(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function totalRouteDistance(route: RoutePoint[]): number {
  let total = 0
  for (let i = 1; i < route.length; i++) {
    total += distanceBetween(route[i - 1]!.lat, route[i - 1]!.lng, route[i]!.lat, route[i]!.lng)
  }
  return total
}

function getPointOnRoute(route: RoutePoint[], progress: number): RoutePoint {
  const totalLen = route.length - 1
  const exactIdx = progress * totalLen
  const idx = Math.floor(exactIdx)
  const frac = exactIdx - idx

  if (idx >= totalLen) return route[totalLen]!
  const p1 = route[idx]!
  const p2 = route[Math.min(idx + 1, totalLen)]!
  return {
    lng: p1.lng + (p2.lng - p1.lng) * frac,
    lat: p1.lat + (p2.lat - p1.lat) * frac,
  }
}

function formatEta(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  const now = new Date()
  now.setHours(now.getHours() + h)
  now.setMinutes(now.getMinutes() + m)
  return now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
}
