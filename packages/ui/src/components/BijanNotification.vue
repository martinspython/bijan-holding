<script setup lang="ts">
import { cn, getStatusColor, formatRelativeTime } from '../utils'
import { X } from 'lucide-vue-next'
import type { Notification } from '@bijan/types'

interface Props {
  notification: Notification
}

const props = defineProps<Props>()
const emit = defineEmits<{
  dismiss: [id: string]
}>()
</script>

<template>
  <div
    :class="cn(
      'flex items-start gap-3 rounded-lg border p-3 transition-all',
      notification.read ? 'bg-background' : 'bg-muted/50',
    )"
    role="alert"
    :aria-label="notification.title"
  >
    <span
      :class="['mt-1 h-2 w-2 shrink-0 rounded-full', getStatusColor(notification.type)]"
      aria-hidden="true"
    />
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium">{{ notification.title }}</p>
      <p class="text-xs text-muted-foreground line-clamp-2">{{ notification.message }}</p>
      <p class="mt-1 text-xs text-muted-foreground">
        {{ formatRelativeTime(notification.timestamp) }}
      </p>
    </div>
    <button
      class="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      @click="emit('dismiss', notification.id)"
      aria-label="بستن اعلان"
    >
      <X class="h-3.5 w-3.5" />
    </button>
  </div>
</template>
