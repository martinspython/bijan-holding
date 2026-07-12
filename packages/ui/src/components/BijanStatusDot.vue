<script setup lang="ts">
import { cn, getStatusColor } from '../utils'

interface Props {
  status: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  size: 'md',
})

const sizeClasses: Record<string, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2.5 w-2.5',
  lg: 'h-3.5 w-3.5',
}
</script>

<template>
  <span class="inline-flex items-center gap-1.5">
    <span
      :class="cn('inline-block rounded-full', sizeClasses[size], getStatusColor(status))"
      :style="{ backgroundColor: 'currentColor' }"
      :aria-label="label || status"
      role="status"
    />
    <span v-if="label" class="text-sm text-muted-foreground">{{ label }}</span>
  </span>
</template>
