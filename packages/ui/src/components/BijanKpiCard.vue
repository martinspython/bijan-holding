<script setup lang="ts">
import { cn, formatNumber, getStatusColor } from '../utils'
import { computed } from 'vue'

interface Props {
  label: string
  value: number
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  changePercentage?: number
  changeLabel?: string
  icon?: string
  color?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  unit: '',
  trend: 'stable',
  changePercentage: 0,
  changeLabel: '',
  icon: '',
  color: 'primary',
  loading: false,
})

const trendColor = computed(() => getStatusColor(props.trend ?? 'stable'))
const trendArrow = computed(() => {
  if (props.trend === 'up') return '↑'
  if (props.trend === 'down') return '↓'
  return '→'
})
</script>

<template>
  <div
    class="rounded-xl border bg-card p-4 md:p-6 shadow-sm transition-all duration-200 hover:shadow-md"
    role="article"
    :aria-label="label"
  >
    <div v-if="loading" class="space-y-3">
      <div class="h-4 w-24 animate-pulse rounded bg-muted" />
      <div class="h-8 w-32 animate-pulse rounded bg-muted" />
      <div class="h-3 w-20 animate-pulse rounded bg-muted" />
    </div>
    <template v-else>
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-muted-foreground">{{ label }}</span>
        <svg
          v-if="icon"
          class="h-5 w-5 text-muted-foreground"
          aria-hidden="true"
        >
          <use :href="`#${icon}`" />
        </svg>
      </div>
      <div class="mt-2 flex items-baseline gap-1">
        <span class="text-2xl font-bold tracking-tight" :style="{ color }">
          {{ formatNumber(value) }}
        </span>
        <span v-if="unit" class="text-sm text-muted-foreground">{{ unit }}</span>
      </div>
      <div v-if="changePercentage" class="mt-1 flex items-center gap-1">
        <span :class="cn('text-sm font-medium', trendColor)">
          {{ trendArrow }} {{ Math.abs(changePercentage) }}%
        </span>
        <span v-if="changeLabel" class="text-xs text-muted-foreground">{{ changeLabel }}</span>
      </div>
    </template>
  </div>
</template>
