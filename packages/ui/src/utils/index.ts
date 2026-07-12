import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, locale: string = 'fa-IR'): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatCurrency(value: number, locale: string = 'fa-IR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'fa-IR' ? 'IRR' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: string, locale: string = 'fa-IR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string, locale: string = 'fa-IR'): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const diff = Date.now() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return rtf.format(-days, 'day')
  if (hours > 0) return rtf.format(-hours, 'hour')
  if (minutes > 0) return rtf.format(-minutes, 'minute')
  return rtf.format(0, 'minute')
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    running: 'text-green-500',
    moving: 'text-blue-500',
    idle: 'text-amber-500',
    parked: 'text-gray-500',
    maintenance: 'text-red-500',
    stopped: 'text-red-600',
    active: 'text-green-500',
    'on-leave': 'text-amber-500',
    terminated: 'text-red-500',
    operational: 'text-green-500',
    construction: 'text-amber-500',
    planned: 'text-blue-500',
    critical: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
    success: 'text-green-500',
    error: 'text-red-500',
    up: 'text-green-500',
    down: 'text-red-500',
    stable: 'text-gray-500',
  }
  return colors[status] ?? 'text-gray-500'
}

export function getStatusBgColor(status: string): string {
  const colors: Record<string, string> = {
    running: 'bg-green-100 dark:bg-green-900/30',
    moving: 'bg-blue-100 dark:bg-blue-900/30',
    idle: 'bg-amber-100 dark:bg-amber-900/30',
    parked: 'bg-gray-100 dark:bg-gray-800',
    maintenance: 'bg-red-100 dark:bg-red-900/30',
    stopped: 'bg-red-100 dark:bg-red-900/30',
    active: 'bg-green-100 dark:bg-green-900/30',
    'on-leave': 'bg-amber-100 dark:bg-amber-900/30',
    terminated: 'bg-red-100 dark:bg-red-900/30',
    operational: 'bg-green-100 dark:bg-green-900/30',
    construction: 'bg-amber-100 dark:bg-amber-900/30',
    planned: 'bg-blue-100 dark:bg-blue-900/30',
    critical: 'bg-red-100 dark:bg-red-900/30',
    warning: 'bg-amber-100 dark:bg-amber-900/30',
    info: 'bg-blue-100 dark:bg-blue-900/30',
    success: 'bg-green-100 dark:bg-green-900/30',
    error: 'bg-red-100 dark:bg-red-900/30',
  }
  return colors[status] ?? 'bg-gray-100 dark:bg-gray-800'
}
