<script setup lang="ts">
import { cn } from '../utils'
import type { TimelineEvent } from '@bijan/types'
import { formatRelativeTime } from '../utils'

interface Props {
  events: TimelineEvent[]
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
})

const severityColors: Record<string, string> = {
  info: 'border-blue-500',
  warning: 'border-amber-500',
  success: 'border-green-500',
  error: 'border-red-500',
}

const severityIcons: Record<string, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  success: '✅',
  error: '❌',
}
</script>

<template>
  <div class="space-y-0" role="list" aria-label="رویدادها">
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 5" :key="i" class="flex gap-3">
        <div class="h-4 w-4 rounded-full bg-muted animate-pulse" />
        <div class="flex-1 space-y-2">
          <div class="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div class="h-3 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
    <template v-else>
      <div
        v-for="(event, i) in events"
        :key="event.id"
        class="relative flex gap-4 pb-6"
        role="listitem"
      >
        <div class="flex flex-col items-center">
          <div
            :class="cn(
              'flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background text-xs',
              severityColors[event.severity] ?? 'border-gray-300',
            )"
          >
            {{ severityIcons[event.severity] ?? '•' }}
          </div>
          <div
            v-if="i < events.length - 1"
            class="mt-1 w-0.5 flex-1 bg-border"
          />
        </div>
        <div class="flex-1 pt-1">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-medium">{{ event.title }}</h4>
            <span class="text-xs text-muted-foreground">
              {{ formatRelativeTime(event.timestamp) }}
            </span>
          </div>
          <p class="mt-0.5 text-xs text-muted-foreground">{{ event.description }}</p>
          <span class="text-[10px] text-muted-foreground">{{ event.user }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
