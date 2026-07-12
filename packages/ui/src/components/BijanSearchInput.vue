<script setup lang="ts">
import { Search } from 'lucide-vue-next'

defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [v: string]
}>()
</script>

<template>
  <div class="relative">
    <Search class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder || 'جستجو...'"
      class="h-10 w-full rounded-lg border bg-background pr-10 pl-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="جستجو"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
