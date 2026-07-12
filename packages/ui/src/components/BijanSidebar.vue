<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Factory,
  Truck,
  BarChart3,
  Users,
  Store,
  Settings,
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FileText,
} from 'lucide-vue-next'
import { cn } from '../utils'
import { useTheme } from '../composables/useTheme'

interface NavItem {
  label: string
  icon: string
  route: string
  badge?: number
}

const props = withDefaults(defineProps<{
  collapsed?: boolean
}>(), {
  collapsed: false,
})

const emit = defineEmits<{
  'update:collapsed': [v: boolean]
}>()

const route = useRoute()
const router = useRouter()
const { isDark, toggle: toggleTheme } = useTheme()

const navItems: NavItem[] = [
  { label: 'داشبورد', icon: 'LayoutDashboard', route: '/dashboard' },
  { label: 'تولید', icon: 'Factory', route: '/production' },
  { label: 'ناوگان', icon: 'Truck', route: '/fleet' },
  { label: 'فروش', icon: 'BarChart3', route: '/sales' },
  { label: 'منابع انسانی', icon: 'Users', route: '/hr' },
  { label: 'فروشگاه‌های زنجیره‌ای', icon: 'Store', route: '/festival' },
  { label: 'گزارشات', icon: 'FileText', route: '/reports' },
]

const bottomItems: NavItem[] = [
  { label: 'تنظیمات', icon: 'Settings', route: '/settings' },
  { label: 'پشتیبانی', icon: 'LifeBuoy', route: '/support' },
]

const iconMap: Record<string, unknown> = {
  LayoutDashboard, Factory, Truck, BarChart3, Users, Store, Settings, LifeBuoy, FileText,
}

const currentRoute = computed(() => route.path)

function navigate(item: NavItem): void {
  router.push(item.route)
}

const isCollapsed = computed({
  get: () => props.collapsed,
  set: (v) => emit('update:collapsed', v),
})
</script>

<template>
  <aside
    :class="cn(
      'flex flex-col border-l bg-sidebar transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64',
    )"
    role="navigation"
    :aria-label="'منوی اصلی'"
  >
    <div class="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red">
        <span class="text-sm font-bold text-white">B</span>
      </div>
      <Transition name="fade">
        <div v-if="!isCollapsed" class="flex flex-col">
          <span class="text-sm font-semibold text-sidebar-foreground">بیژن هولدینگ</span>
          <span class="text-[10px] text-sidebar-muted">سامانه مدیریت یکپارچه</span>
        </div>
      </Transition>
    </div>

    <div class="flex-1 overflow-y-auto p-2">
      <div class="space-y-1">
        <button
          v-for="item in navItems"
          :key="item.route"
          :class="cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            currentRoute === item.route
              ? 'bg-sidebar-accent text-sidebar-foreground'
              : 'text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
          )"
          @click="navigate(item)"
          :aria-current="currentRoute === item.route ? 'page' : undefined"
        >
          <component :is="iconMap[item.icon]" class="h-5 w-5 shrink-0" aria-hidden="true" />
          <Transition name="fade">
            <span v-if="!isCollapsed" class="truncate">{{ item.label }}</span>
          </Transition>
          <span
            v-if="item.badge && !isCollapsed"
            class="mr-auto rounded-full bg-brand-red px-2 py-0.5 text-xs text-white"
          >
            {{ item.badge }}
          </span>
        </button>
      </div>
    </div>

    <div class="border-t border-sidebar-border p-2 space-y-1">
      <button
        v-for="item in bottomItems"
        :key="item.route"
        :class="cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          currentRoute === item.route
            ? 'bg-sidebar-accent text-sidebar-foreground'
            : 'text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
        )"
        @click="navigate(item)"
      >
        <component :is="iconMap[item.icon]" class="h-5 w-5 shrink-0" aria-hidden="true" />
        <Transition name="fade">
          <span v-if="!isCollapsed" class="truncate">{{ item.label }}</span>
        </Transition>
      </button>

      <button
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-muted transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        @click="toggleTheme"
        :aria-label="isDark ? 'حالت روشن' : 'حالت تاریک'"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path v-if="isDark" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <Transition name="fade">
          <span v-if="!isCollapsed">{{ isDark ? 'حالت روشن' : 'حالت تاریک' }}</span>
        </Transition>
      </button>

      <button
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-muted transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        @click="isCollapsed = !isCollapsed"
        :aria-label="isCollapsed ? 'باز کردن منو' : 'بستن منو'"
      >
        <component :is="isCollapsed ? ChevronLeft : ChevronRight" class="h-5 w-5 shrink-0" aria-hidden="true" />
      </button>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
