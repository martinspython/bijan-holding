<script setup lang="ts">
import { cn } from '../utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-vue-next'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pr-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        warning: 'border-amber-500/50 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-200 [&>svg]:text-amber-600',
        success: 'border-green-500/50 bg-green-50 text-green-900 dark:border-green-500/30 dark:bg-green-950/30 dark:text-green-200 [&>svg]:text-green-600',
        info: 'border-blue-500/50 bg-blue-50 text-blue-900 dark:border-blue-500/30 dark:bg-blue-950/30 dark:text-blue-200 [&>svg]:text-blue-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type AlertVariants = VariantProps<typeof alertVariants>

interface Props {
  variant?: AlertVariants['variant']
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  title: '',
})

const iconMap = {
  default: Info,
  destructive: AlertTriangle,
  warning: AlertTriangle,
  success: CheckCircle,
  info: AlertCircle,
}
</script>

<template>
  <div :class="cn(alertVariants({ variant }))" role="alert">
    <component :is="iconMap[variant ?? 'default']" class="h-4 w-4" aria-hidden="true" />
    <h5 v-if="title" class="mb-1 font-medium leading-none tracking-tight">{{ title }}</h5>
    <div class="text-sm [&_p]:leading-relaxed">
      <slot />
    </div>
  </div>
</template>
