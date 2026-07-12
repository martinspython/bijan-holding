<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Building2,
  FileText,
  ShoppingCart,
  BarChart3,
  Globe,
  BrainCircuit,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
} from 'lucide-vue-next'

interface NavItem {
  label: string
  icon: string
  route: string
  badge?: number
}

const props = withDefaults(defineProps<{ collapsed?: boolean }>(), { collapsed: false })
const emit = defineEmits<{ 'update:collapsed': [v: boolean] }>()

const route = useRoute()
const router = useRouter()

const navItems: NavItem[] = [
  { label: 'داشبورد', icon: 'LayoutDashboard', route: '/dashboard' },
  { label: 'تأمین‌کنندگان', icon: 'Building2', route: '/suppliers' },
  { label: 'قراردادها', icon: 'FileText', route: '/contracts' },
  { label: 'سفارشات خرید', icon: 'ShoppingCart', route: '/purchase-orders' },
  { label: 'تحلیل داده', icon: 'BarChart3', route: '/analytics' },
  { label: 'زنجیره تأمین', icon: 'Globe', route: '/supply-chain' },
  { label: 'دستیار مذاکره', icon: 'BrainCircuit', route: '/negotiation' },
  { label: 'تنظیمات', icon: 'Settings', route: '/settings' },
]

const isActive = (itemRoute: string) => route.path.startsWith(itemRoute)

function navigate(item: NavItem): void {
  router.push(item.route)
}

function logout(): void {
  localStorage.removeItem('bijan-commercial-token')
  router.push('/login')
}

const gridIcon = computed(() => props.collapsed ? ChevronLeft : ChevronRight)
</script>

<template>
  <aside
    class="flex flex-col border-l bg-sidebar transition-all duration-300"
    :class="collapsed ? 'w-16' : 'w-60'"
    role="navigation"
    aria-label="منوی بازرگانی"
  >
    <div class="flex h-14 items-center gap-2 border-b px-3" :class="collapsed ? 'justify-center' : 'pr-4'">
      <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-red">
        <span class="text-sm font-bold text-white">B</span>
      </div>
      <Transition name="fade">
        <span v-if="!collapsed" class="text-sm font-bold whitespace-nowrap">بازرگانی بیژن</span>
      </Transition>
    </div>

    <div class="flex-1 overflow-y-auto p-2 space-y-1">
      <button
        v-for="item in navItems"
        :key="item.route"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
        :class="isActive(item.route) ? 'bg-brand-red/10 text-brand-red' : 'text-sidebar-foreground hover:bg-sidebar-accent'"
        @click="navigate(item)"
        :aria-label="item.label"
        :aria-current="isActive(item.route) ? 'page' : undefined"
      >
        <component :is="item.icon" class="h-5 w-5 shrink-0" aria-hidden="true" />
        <Transition name="fade">
          <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
        </Transition>
        <span
          v-if="item.badge && !collapsed"
          class="mr-auto rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-bold text-white"
        >
          {{ item.badge }}
        </span>
      </button>
    </div>

    <div class="border-t p-2">
      <div class="flex justify-center mb-1">
        <button
          class="rounded-lg p-1.5 text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          @click="emit('update:collapsed', !collapsed)"
          :aria-label="collapsed ? 'باز کردن منو' : 'بستن منو'"
        >
          <component :is="gridIcon" class="h-4 w-4" />
        </button>
      </div>
      <button
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        :class="collapsed ? 'justify-center' : ''"
        @click="logout"
        aria-label="خروج"
      >
        <LogOut class="h-5 w-5 shrink-0" aria-hidden="true" />
        <Transition name="fade">
          <span v-if="!collapsed">خروج</span>
        </Transition>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
