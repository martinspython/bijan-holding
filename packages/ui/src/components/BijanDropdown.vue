<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface Props {
  align?: 'start' | 'end'
}

withDefaults(defineProps<Props>(), {
  align: 'start',
})

const open = ref(false)
const target = ref<HTMLElement | null>(null)
const dropdown = ref<HTMLElement | null>(null)

onClickOutside(dropdown, () => { open.value = false })

function toggle(): void {
  open.value = !open.value
}

defineExpose({ open, toggle, close: () => { open.value = false } })
</script>

<template>
  <div ref="target" class="relative inline-block">
    <slot name="trigger" :toggle="toggle" :open="open" />
    <Transition name="dropdown">
      <div
        v-if="open"
        ref="dropdown"
        :class="[
          'absolute z-50 mt-1 min-w-[12rem] rounded-lg border bg-popover p-1 shadow-md',
          align === 'end' ? 'left-0' : 'right-0',
        ]"
        role="menu"
      >
        <slot name="content" :close="() => { open = false }" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
