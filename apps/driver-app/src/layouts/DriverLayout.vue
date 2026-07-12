<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { LayoutDashboard, Navigation, Package, User, ChevronDown } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const showStatusMenu = ref(false)

const navItems = [
  { label: 'داشبورد', icon: LayoutDashboard, route: '/dashboard' },
  { label: 'مسیر', icon: Navigation, route: '/route' },
  { label: 'محمولات', icon: Package, route: '/deliveries' },
  { label: 'پروفایل', icon: User, route: '/profile' },
]

function navigate(r: string): void {
  router.push(r)
}
</script>

<template>
  <div class="flex h-screen flex-col bg-background safe-area">
    <header class="flex items-center justify-between bg-brand-red px-4 py-3 text-white">
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
          <span class="text-sm font-bold">ب</span>
        </div>
        <div>
          <h1 class="text-sm font-semibold">بیژن هولدینگ</h1>
          <p class="text-[10px] text-white/80">ناوگان حمل و نقل</p>
        </div>
      </div>
      <div class="relative">
        <button
          class="flex items-center gap-1 rounded-lg bg-white/20 px-2.5 py-1.5 text-xs"
          @click="showStatusMenu = !showStatusMenu"
          aria-label="وضعیت"
        >
          <span class="h-2 w-2 rounded-full bg-green-300" />
          فعال
          <ChevronDown class="h-3 w-3" />
        </button>
        <Transition name="fade">
          <div v-if="showStatusMenu" class="absolute left-0 top-full mt-1 w-36 rounded-lg border bg-background text-foreground shadow-lg">
            <button class="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent">
              <span class="h-2 w-2 rounded-full bg-green-500" /> فعال
            </button>
            <button class="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent">
              <span class="h-2 w-2 rounded-full bg-amber-500" /> استراحت
            </button>
            <button class="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent">
              <span class="h-2 w-2 rounded-full bg-red-500" /> پایان شیفت
            </button>
          </div>
        </Transition>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto pb-16">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <nav class="fixed bottom-0 left-0 right-0 z-30 border-t bg-background pb-safe" role="navigation" aria-label="منوی اصلی">
      <div class="flex items-center justify-around py-1">
        <button
          v-for="item in navItems"
          :key="item.route"
          class="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-colors"
          :class="route.path === item.route ? 'text-brand-red' : 'text-muted-foreground'"
          @click="navigate(item.route)"
        >
          <component :is="item.icon" class="h-5 w-5" />
          <span>{{ item.label }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.safe-area {
  padding-top: env(safe-area-inset-top);
}
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
