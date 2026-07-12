<script setup lang="ts">
import { cn } from '../utils'

interface Props {
  class?: string
  variant?: 'text' | 'circle' | 'rect' | 'card'
  width?: string
  height?: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  variant: 'text',
  width: '100%',
  height: '16px',
  count: 1,
})
</script>

<template>
  <div v-for="i in count" :key="i" :class="cn('animate-pulse rounded bg-muted', props.class)" :style="{
    width: variant === 'circle' ? height : width,
    height: variant === 'circle' ? height : height,
    borderRadius: variant === 'circle' ? '50%' : variant === 'card' ? '12px' : '4px',
  }" role="status" :aria-label="'در حال بارگذاری'">
    <span class="sr-only">Loading...</span>
  </div>
</template>
