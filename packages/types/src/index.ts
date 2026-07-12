export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  department: Department
  phone: string
}

export type UserRole = 'admin' | 'manager' | 'supervisor' | 'operator' | 'driver' | 'viewer'

export type Department =
  | 'executive'
  | 'production'
  | 'logistics'
  | 'sales'
  | 'hr'
  | 'finance'
  | 'quality'
  | 'maintenance'

export interface KpiMetric {
  id: string
  label: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  changePercentage: number
  changeLabel?: string
  icon: string
  color: string
}

export interface ProductionLine {
  id: string
  name: string
  status: 'running' | 'idle' | 'maintenance' | 'stopped'
  productName: string
  currentOutput: number
  dailyTarget: number
  dailyAchieved: number
  efficiency: number
  oee: number
  operator: string
  startedAt: string
  alerts: Alert[]
}

export interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  message: string
  timestamp: string
  acknowledged: boolean
}

export interface FleetVehicle {
  id: string
  plateNumber: string
  driverName: string
  driverPhone: string
  status: 'moving' | 'idle' | 'parked' | 'maintenance'
  location: GeoLocation
  speed: number
  fuelLevel: number
  lastMaintenance: string
  nextMaintenance: string
  route: string
  cargo: string
  temperature?: number
}

export interface GeoLocation {
  lat: number
  lng: number
  address: string
}

export interface SalesData {
  date: string
  revenue: number
  orders: number
  products: ProductSales[]
  channel: 'retail' | 'wholesale' | 'export'
}

export interface ProductSales {
  productId: string
  productName: string
  quantity: number
  revenue: number
  category: string
}

export interface Product {
  id: string
  name: string
  category: string
  sku: string
  price: number
  unit: string
  stock: number
  minStock: number
  maxStock: number
  status: 'active' | 'discontinued' | 'seasonal'
}

export interface Employee {
  id: string
  name: string
  position: string
  department: Department
  avatar?: string
  status: 'active' | 'on-leave' | 'terminated'
  joinDate: string
  email: string
  phone: string
  shift: 'morning' | 'afternoon' | 'night' | 'rotating'
}

export interface FestivalStore {
  id: string
  name: string
  location: string
  status: 'operational' | 'construction' | 'planned'
  openingDate?: string
  area: number
  employees: number
  monthlyRevenue: number
  managerName: string
}

export interface DistributionRoute {
  id: string
  name: string
  cities: string[]
  vehicleCount: number
  dailyCapacity: number
  estimatedHours: number
  status: 'active' | 'inactive'
}

export interface DashboardSummary {
  kpis: KpiMetric[]
  productionOverview: ProductionLine[]
  fleetSummary: {
    total: number
    moving: number
    idle: number
    maintenance: number
  }
  todaySales: number
  monthlySales: number
  activeEmployees: number
  alerts: Alert[]
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'warning' | 'critical' | 'info'
  timestamp: string
  read: boolean
}

export interface TimelineEvent {
  id: string
  type: string
  title: string
  description: string
  timestamp: string
  user: string
  severity: 'info' | 'warning' | 'success' | 'error'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp: string
}

export type ThemeMode = 'light' | 'dark'

export type Locale = 'fa-IR' | 'en-US'

export interface AppConfig {
  theme: ThemeMode
  locale: Locale
  sidebarCollapsed: boolean
  notifications: Notification[]
}
