import type {
  DashboardSummary, ProductionLine, FleetVehicle, SalesData, Employee, FestivalStore, Product,
} from '@bijan/types'

export const mockDashboard: DashboardSummary = {
  kpis: [
    {
      id: 'kpi-1', label: 'تولید روزانه', value: 847000, unit: 'بسته',
      trend: 'up', changePercentage: 12.5, changeLabel: 'نسبت به دیروز', icon: 'package', color: '#C41E3A',
    },
    {
      id: 'kpi-2', label: 'ضریب کارایی کل (OEE)', value: 87.3, unit: '%',
      trend: 'up', changePercentage: 2.1, changeLabel: 'نسبت به هفته قبل', icon: 'activity', color: '#2D5016',
    },
    {
      id: 'kpi-3', label: 'ناوگان فعال', value: 312, unit: 'دستگاه',
      trend: 'stable', changePercentage: 0, changeLabel: 'از ۴۵۰ کل', icon: 'truck', color: '#FF6B35',
    },
    {
      id: 'kpi-4', label: 'فروش ماهانه', value: 185000000000, unit: 'ریال',
      trend: 'up', changePercentage: 8.3, icon: 'dollar', color: '#D4AF37',
    },
    {
      id: 'kpi-5', label: 'کارکنان فعال', value: 4250, unit: 'نفر',
      trend: 'up', changePercentage: 1.2, icon: 'users', color: '#1E40AF',
    },
    {
      id: 'kpi-6', label: 'رضایت مشتری', value: 92.4, unit: '%',
      trend: 'up', changePercentage: 0.8, icon: 'heart', color: '#C41E3A',
    },
  ],
  productionOverview: [
    {
      id: 'prod-1', name: 'خط تولید A - بیسکویت', status: 'running',
      productName: 'بیسکویت پتی بور', currentOutput: 18500, dailyTarget: 20000,
      dailyAchieved: 142000, efficiency: 92.5, oee: 85.2,
      operator: 'رضا محمدی', startedAt: '2026-07-11T06:00:00', alerts: [],
    },
    {
      id: 'prod-2', name: 'خط تولید B - ویفر', status: 'running',
      productName: 'ویفر شکلاتی', currentOutput: 22000, dailyTarget: 24000,
      dailyAchieved: 165000, efficiency: 91.7, oee: 88.4,
      operator: 'سارا احمدی', startedAt: '2026-07-11T06:00:00',
      alerts: [{ id: 'alert-1', type: 'warning', message: 'دمای کوره از محدوده نرمال خارج شده', timestamp: new Date().toISOString(), acknowledged: false }],
    },
    {
      id: 'prod-3', name: 'خط تولید C - کیک', status: 'idle',
      productName: 'کیک اسفنجی', currentOutput: 0, dailyTarget: 15000,
      dailyAchieved: 95000, efficiency: 0, oee: 72.1,
      operator: 'علی کریمی', startedAt: '2026-07-11T08:00:00',
      alerts: [{ id: 'alert-2', type: 'info', message: 'تعویض شیفت در ۳۰ دقیقه آینده', timestamp: new Date().toISOString(), acknowledged: false }],
    },
    {
      id: 'prod-4', name: 'خط D - نان صنعتی', status: 'maintenance',
      productName: 'نان تست', currentOutput: 0, dailyTarget: 12000,
      dailyAchieved: 78000, efficiency: 0, oee: 65.8,
      operator: 'مریم حسینی', startedAt: '2026-07-10T22:00:00',
      alerts: [{ id: 'alert-3', type: 'critical', message: 'خرابی نوار نقاله - توقف اضطراری', timestamp: new Date().toISOString(), acknowledged: false }],
    },
  ],
  fleetSummary: { total: 450, moving: 312, idle: 98, maintenance: 40 },
  todaySales: 6200000000,
  monthlySales: 185000000000,
  activeEmployees: 4250,
  alerts: [
    { id: 'alert-4', type: 'critical', message: 'خرابی نوار نقاله خط D - توقف تولید', timestamp: new Date().toISOString(), acknowledged: false },
    { id: 'alert-5', type: 'warning', message: 'دمای کوره خط B نزدیک به محدوده خطر', timestamp: new Date(Date.now() - 1800000).toISOString(), acknowledged: false },
    { id: 'alert-6', type: 'info', message: 'برنامه تعمیرات هفتگی - چهارشنبه ۱۶ تیر', timestamp: new Date(Date.now() - 3600000).toISOString(), acknowledged: true },
  ],
}

export const mockProductionLines: ProductionLine[] = [
  {
    id: 'prod-1', name: 'خط تولید A - بیسکویت', status: 'running',
    productName: 'بیسکویت پتی بور', currentOutput: 18500, dailyTarget: 20000,
    dailyAchieved: 142000, efficiency: 92.5, oee: 85.2,
    operator: 'رضا محمدی', startedAt: '2026-07-11T06:00:00', alerts: [],
  },
  {
    id: 'prod-2', name: 'خط تولید B - ویفر', status: 'running',
    productName: 'ویفر شکلاتی', currentOutput: 22000, dailyTarget: 24000,
    dailyAchieved: 165000, efficiency: 91.7, oee: 88.4,
    operator: 'سارا احمدی', startedAt: '2026-07-11T06:00:00',
    alerts: [{ id: 'alert-7', type: 'warning', message: 'دمای کوره نزدیک به محدوده خطر', timestamp: new Date().toISOString(), acknowledged: false }],
  },
  {
    id: 'prod-3', name: 'خط تولید C - کیک', status: 'idle',
    productName: 'کیک اسفنجی', currentOutput: 0, dailyTarget: 15000,
    dailyAchieved: 95000, efficiency: 0, oee: 72.1,
    operator: 'علی کریمی', startedAt: '2026-07-11T08:00:00', alerts: [],
  },
  {
    id: 'prod-4', name: 'خط D - نان صنعتی', status: 'maintenance',
    productName: 'نان تست', currentOutput: 0, dailyTarget: 12000,
    dailyAchieved: 78000, efficiency: 0, oee: 65.8,
    operator: 'مریم حسینی', startedAt: '2026-07-10T22:00:00',
    alerts: [{ id: 'alert-8', type: 'critical', message: 'خرابی نوار نقاله', timestamp: new Date().toISOString(), acknowledged: false }],
  },
  {
    id: 'prod-5', name: 'خط E - کلوچه', status: 'running',
    productName: 'کلوچه خرمایی', currentOutput: 14000, dailyTarget: 16000,
    dailyAchieved: 112000, efficiency: 87.5, oee: 80.3,
    operator: 'حسن رضایی', startedAt: '2026-07-11T06:00:00', alerts: [],
  },
  {
    id: 'prod-6', name: 'خط F - شکلات', status: 'stopped',
    productName: 'شکلات شیری', currentOutput: 0, dailyTarget: 10000,
    dailyAchieved: 52000, efficiency: 0, oee: 45.6,
    operator: 'نرگس امینی', startedAt: '2026-07-10T14:00:00',
    alerts: [{ id: 'alert-9', type: 'critical', message: 'قطع برق ناگهانی', timestamp: new Date().toISOString(), acknowledged: false }],
  },
]

const driverNames = ['رضا مرادی', 'امیر حسینی', 'سعید کریمی', 'مجتبی نوری', 'حمید رضایی'] as const
const vehicleStatuses = ['moving', 'moving', 'moving', 'idle', 'parked', 'maintenance'] as const
const cities = ['تهران', 'اصفهان', 'شیراز', 'تبریز', 'مشهد', 'اهواز'] as const
const routes = ['تهران-اصفهان', 'تهران-مشهد', 'اصفهان-شیراز', 'تهران-تبریز', 'مشهد-اهواز', 'شیراز-بندرعباس'] as const
const cargos = ['بیسکویت', 'ویفر', 'کیک', 'کلوچه', 'نان', 'شکلات'] as const

export const mockFleetVehicles: FleetVehicle[] = Array.from({ length: 25 }, (_, i) => {
  const idx5 = i % 5
  const idx6 = i % 6
  return {
    id: `vehicle-${i + 1}`,
    plateNumber: `${String(12 + i).padStart(2, '0')} B ${String(345 + i).padStart(3, '0')}`,
    driverName: driverNames[idx5]!,
    driverPhone: `0912${String(1000000 + i * 12345).slice(0, 7)}`,
    status: vehicleStatuses[idx6]!,
    location: {
      lat: 35.6892 + (Math.random() - 0.5) * 2,
      lng: 51.389 + (Math.random() - 0.5) * 2,
      address: cities[idx6]!,
    },
    speed: Math.floor(Math.random() * 80),
    fuelLevel: Math.floor(Math.random() * 100),
    lastMaintenance: `2026-0${6 - (i % 3)}-${10 + i % 20}T10:00:00`,
    nextMaintenance: `2026-0${7 + (i % 3)}-${5 + i % 25}T10:00:00`,
    route: routes[idx6]!,
    cargo: cargos[idx6]!,
    temperature: i % 3 === 0 ? undefined : 18 + Math.random() * 10,
  }
})

export const mockSalesData: SalesData[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2026, 6, i + 1).toISOString().split('T')[0]!,
  revenue: 5000000000 + Math.random() * 3000000000,
  orders: 80 + Math.floor(Math.random() * 120),
  products: [
    { productId: 'p1', productName: 'بیسکویت پتی بور', quantity: 5000 + Math.floor(Math.random() * 3000), revenue: 250000000 + Math.random() * 150000000, category: 'بیسکویت' },
    { productId: 'p2', productName: 'ویفر شکلاتی', quantity: 4000 + Math.floor(Math.random() * 2500), revenue: 320000000 + Math.random() * 180000000, category: 'ویفر' },
  ],
  channel: (['retail', 'wholesale', 'export'] as const)[i % 3]!,
}))

export const mockProducts: Product[] = [
  { id: 'p1', name: 'بیسکویت پتی بور', category: 'بیسکویت', sku: 'BIS-001', price: 85000, unit: 'بسته', stock: 45000, minStock: 10000, maxStock: 80000, status: 'active' },
  { id: 'p2', name: 'ویفر شکلاتی', category: 'ویفر', sku: 'WAF-001', price: 95000, unit: 'بسته', stock: 32000, minStock: 8000, maxStock: 60000, status: 'active' },
  { id: 'p3', name: 'کیک اسفنجی', category: 'کیک', sku: 'CAK-001', price: 120000, unit: 'عدد', stock: 28000, minStock: 5000, maxStock: 40000, status: 'active' },
  { id: 'p4', name: 'نان تست', category: 'نان', sku: 'BRD-001', price: 45000, unit: 'بسته', stock: 15000, minStock: 8000, maxStock: 50000, status: 'active' },
  { id: 'p5', name: 'کلوچه خرمایی', category: 'کلوچه', sku: 'COL-001', price: 75000, unit: 'بسته', stock: 22000, minStock: 6000, maxStock: 35000, status: 'active' },
  { id: 'p6', name: 'شکلات شیری', category: 'شکلات', sku: 'CHO-001', price: 150000, unit: 'عدد', stock: 5000, minStock: 3000, maxStock: 20000, status: 'seasonal' },
  { id: 'p7', name: 'بیسکویت ساقه طلایی', category: 'بیسکویت', sku: 'BIS-002', price: 95000, unit: 'بسته', stock: 38000, minStock: 10000, maxStock: 70000, status: 'active' },
  { id: 'p8', name: 'ویفر وانیلی', category: 'ویفر', sku: 'WAF-002', price: 85000, unit: 'بسته', stock: 12000, minStock: 5000, maxStock: 40000, status: 'active' },
]

const names = ['رضا محمدی', 'سارا احمدی', 'علی کریمی', 'مریم حسینی', 'حسن رضایی', 'نرگس امینی'] as const
const positions = ['مدیر تولید', 'تکنسین', 'اپراتور', 'مهندس کیفیت', 'سرپرست خط', 'کارگر'] as const
const departments = ['production', 'logistics', 'sales', 'hr', 'quality', 'production'] as const
const statuses = ['active', 'active', 'active', 'on-leave', 'active', 'terminated'] as const
const shifts = ['morning', 'afternoon', 'night', 'rotating'] as const

export const mockEmployees: Employee[] = Array.from({ length: 30 }, (_, i) => {
  const idx = i % 6
  return {
    id: `emp-${i + 1}`,
    name: names[idx]!,
    position: positions[idx]!,
    department: departments[idx]!,
    status: statuses[idx]!,
    joinDate: `202${i % 4}-0${(i % 9) + 1}-${10 + i % 20}T00:00:00`,
    email: `employee${i + 1}@bijan.com`,
    phone: `0912${String(3000000 + i * 13579).slice(0, 7)}`,
    shift: shifts[i % 4]!,
  }
})

export const mockFestivalStores: FestivalStore[] = [
  { id: 'fs-1', name: 'فروشگاه مرکزی تهران', location: 'تهران، خیابان ولیعصر', status: 'operational', openingDate: '2024-03-15', area: 2500, employees: 45, monthlyRevenue: 8500000000, managerName: 'احمد نوری' },
  { id: 'fs-2', name: 'فروشگاه اصفهان', location: 'اصفهان، چهارباغ', status: 'operational', openingDate: '2024-06-20', area: 1800, employees: 32, monthlyRevenue: 6200000000, managerName: 'زهرا کریمی' },
  { id: 'fs-3', name: 'فروشگاه شیراز', location: 'شیراز، بلوار زند', status: 'construction', area: 2200, employees: 0, monthlyRevenue: 0, managerName: 'محمد رستمی' },
  { id: 'fs-4', name: 'فروشگاه مشهد', location: 'مشهد، خیابان امام رضا', status: 'operational', openingDate: '2024-09-01', area: 3000, employees: 55, monthlyRevenue: 9200000000, managerName: 'علی اکبری' },
  { id: 'fs-5', name: 'فروشگاه تبریز', location: 'تبریز، خیابان امام', status: 'construction', area: 1500, employees: 0, monthlyRevenue: 0, managerName: 'سعید حسینی' },
  { id: 'fs-6', name: 'فروشگاه کرج', location: 'کرج، میدان آزادی', status: 'planned', area: 2000, employees: 0, monthlyRevenue: 0, managerName: 'ندا رحیمی' },
]

export const mockNotifications = [
  { id: 'notif-1', title: 'هشدار تولید', message: 'دمای کوره خط B از محدوده نرمال خارج شده است', type: 'warning' as const, timestamp: new Date().toISOString(), read: false },
  { id: 'notif-2', title: 'تغییر وضعیت ناوگان', message: '۵ دستگاه کامیون به مقصد اصفهان حرکت کردند', type: 'info' as const, timestamp: new Date(Date.now() - 900000).toISOString(), read: false },
  { id: 'notif-3', title: 'توقف خط تولید', message: 'خرابی نوار نقاله خط D - تیم تعمیرات در محل', type: 'critical' as const, timestamp: new Date(Date.now() - 1800000).toISOString(), read: false },
  { id: 'notif-4', title: 'فروش روزانه', message: 'فروش امروز از مرز ۶ میلیارد ریال گذشت', type: 'success' as const, timestamp: new Date(Date.now() - 3600000).toISOString(), read: true },
  { id: 'notif-5', title: 'گزارش هفتگی', message: 'گزارش عملکرد هفتگی آماده دانلود است', type: 'info' as const, timestamp: new Date(Date.now() - 7200000).toISOString(), read: true },
]
