<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { BijanHeader } from '@bijan/ui'
import CommercialSidebar from '../components/CommercialSidebar.vue'

const sidebarCollapsed = ref(false)
const mobileSidebarOpen = ref(false)
const routeError = ref<string | null>(null)

onErrorCaptured((err) => {
  routeError.value = err instanceof Error ? err.message : 'خطا در بارگذاری صفحه'
  console.warn('Route error:', err)
  return false
})

function toggleMobileSidebar(): void {
  mobileSidebarOpen.value = !mobileSidebarOpen.value
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <div class="hidden lg:flex">
      <CommercialSidebar v-model:collapsed="sidebarCollapsed" />
    </div>

    <div
      v-if="mobileSidebarOpen"
      class="fixed inset-0 z-40 lg:hidden"
    >
      <div class="fixed inset-0 bg-black/50" @click="mobileSidebarOpen = false" />
      <div class="relative w-64">
        <CommercialSidebar @update:collapsed="() => mobileSidebarOpen = false" />
      </div>
    </div>

    <div class="flex flex-1 flex-col min-w-0">
      <BijanHeader
        username="مدیر بازرگانی"
        userRole="مدیر تدارکات"
        :unread="5"
        @menu-toggle="toggleMobileSidebar"
      />
      <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-thin">
        <div v-if="routeError" class="flex items-center justify-center h-full">
          <div class="text-center p-8">
            <h3 class="text-lg font-semibold mb-2">خطا در بارگذاری صفحه</h3>
            <p class="text-sm text-muted-foreground mb-4">{{ routeError }}</p>
            <button class="text-sm text-brand-red hover:underline" @click="routeError = null; $router.go(0)">
              تلاش مجدد
            </button>
          </div>
        </div>
        <RouterView v-slot="{ Component }" v-else>
          <component :is="Component" :key="$route.fullPath" />
        </RouterView>
      </main>
    </div>
  </div>
</template>
