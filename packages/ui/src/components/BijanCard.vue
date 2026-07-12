<script setup lang="ts">
import { cn } from '../utils'

interface Props {
  class?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  hover: false,
  padding: 'md',
})

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4 md:p-6',
  lg: 'p-6 md:p-8',
}
</script>

<template>
  <div
    :class="cn(
      'rounded-xl border bg-card text-card-foreground shadow-sm',
      hover && 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
      paddingClasses[padding],
      props.class,
    )"
  >
    <slot />
  </div>
</template>
