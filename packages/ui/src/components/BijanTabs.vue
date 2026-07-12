<script setup lang="ts">
import { cn } from '../utils'
import { computed } from 'vue'

interface Tab {
  id: string
  label: string
  badge?: string | number
  icon?: string
}

interface Props {
  tabs: Tab[]
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [v: string]
}>()

const activeTab = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>

<template>
  <div class="w-full" role="tablist" :aria-label="'تب‌ها'">
    <div class="flex border-b border-border">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="cn(
          'relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors',
          activeTab === tab.id
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground',
        )"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`tabpanel-${tab.id}`"
        role="tab"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
        <span
          v-if="tab.badge"
          class="inline-flex items-center justify-center rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground"
        >
          {{ tab.badge }}
        </span>
        <span
          v-if="activeTab === tab.id"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
        />
      </button>
    </div>
    <div class="mt-4" role="tabpanel" :id="`tabpanel-${activeTab}`">
      <slot :name="activeTab" />
    </div>
  </div>
</template>
