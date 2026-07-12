<script setup lang="ts">
import { watch } from 'vue'
import { X } from 'lucide-vue-next'
import { cn } from '../utils'

interface Props {
  open: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: 'md',
  closable: true,
})

const emit = defineEmits<{
  close: []
  'update:open': [v: boolean]
}>()

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]',
}

function close(): void {
  emit('close')
  emit('update:open', false)
}

watch(() => props.open, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        :aria-modal="true"
        :aria-label="title || 'Modal'"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="close" />
        <div
          :class="cn(
            'relative w-full rounded-xl border bg-background p-6 shadow-2xl animate-scale-in',
            sizeClasses[size],
          )"
        >
          <div v-if="title || closable" class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold">{{ title }}</h2>
            <button
              v-if="closable"
              class="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              @click="close"
              aria-label="بستن"
            >
              <X class="h-5 w-5" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
