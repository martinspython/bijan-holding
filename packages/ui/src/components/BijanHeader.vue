<script setup lang="ts">
import { ref } from 'vue'
import { Bell, Search, Menu } from 'lucide-vue-next'
import { onClickOutside } from '@vueuse/core'
import { cn, formatRelativeTime } from '../utils'
import { useNotifications } from '../composables/useNotifications'

interface Props {
  username?: string
  userRole?: string
  unread?: number
  onMenuToggle?: () => void
}

withDefaults(defineProps<Props>(), {
  username: 'کاربر',
  userRole: 'مدیر',
  unread: 0,
  onMenuToggle: () => {},
})

const { notifications, markRead, remove } = useNotifications()
const showNotifications = ref(false)
const notificationPanel = ref<HTMLElement | null>(null)

onClickOutside(notificationPanel, () => {
  showNotifications.value = false
})
</script>

<template>
  <header
    class="flex h-14 items-center justify-between border-b bg-background px-4"
    role="banner"
  >
    <div class="flex items-center gap-3">
      <button
        class="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        @click="onMenuToggle"
        aria-label="منو"
      >
        <Menu class="h-5 w-5" />
      </button>
      <div class="relative hidden md:block">
        <Search class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          type="text"
          placeholder="جستجو..."
          class="h-9 w-64 rounded-lg border bg-muted/50 pr-10 pl-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="جستجو"
        />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <div class="relative">
        <button
          class="relative rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          @click="showNotifications = !showNotifications"
          aria-label="اعلان‌ها"
        >
          <Bell class="h-5 w-5" />
          <span
            v-if="unread > 0"
            class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white"
          >
            {{ unread > 99 ? '99+' : unread }}
          </span>
        </button>

        <Transition name="dropdown">
          <div
            v-if="showNotifications"
            ref="notificationPanel"
            class="absolute left-0 top-full mt-2 w-80 rounded-xl border bg-popover shadow-lg"
          >
            <div class="flex items-center justify-between border-b p-3">
              <h3 class="text-sm font-semibold">اعلان‌ها</h3>
              <button
                v-if="notifications.length > 0"
                class="text-xs text-brand-red hover:underline"
                @click="notifications.forEach(n => markRead(n.id))"
              >
                علامت خواندن همه
              </button>
            </div>
            <div class="max-h-80 overflow-y-auto">
              <div v-if="notifications.length === 0" class="p-6 text-center text-sm text-muted-foreground">
                اعلانی وجود ندارد
              </div>
              <div
                v-for="n in notifications"
                :key="n.id"
                :class="cn(
                  'flex items-start gap-2 border-b p-3 transition-colors',
                  n.read ? 'bg-background' : 'bg-muted/30',
                )"
                @click="markRead(n.id)"
              >
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium">{{ n.title }}</p>
                  <p class="text-xs text-muted-foreground line-clamp-2">{{ n.message }}</p>
                  <p class="mt-1 text-[10px] text-muted-foreground">
                    {{ formatRelativeTime(n.timestamp) }}
                  </p>
                </div>
                <button
                  class="shrink-0 rounded p-1 text-muted-foreground hover:text-foreground"
                  @click.stop="remove(n.id)"
                  aria-label="حذف"
                >
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <div class="mr-2 flex items-center gap-2 border-r pl-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
          {{ username.charAt(0) }}
        </div>
        <div class="hidden md:block">
          <p class="text-sm font-medium leading-tight">{{ username }}</p>
          <p class="text-[10px] text-muted-foreground">{{ userRole }}</p>
        </div>
      </div>
    </div>
  </header>
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
