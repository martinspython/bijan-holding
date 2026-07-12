<script setup lang="ts">
import { BijanCard, BijanButton, BijanThemeToggle } from '@bijan/ui'
import { useTheme } from '@bijan/ui'
import { useLocale } from '@bijan/ui'
import { ref } from 'vue'
import { Bell, Globe, Palette, Shield, User, Database, RefreshCw } from 'lucide-vue-next'

const { isDark, setTheme } = useTheme()
const { currentLocale, setLocale } = useLocale()

const activeSection = ref('general')

const sections = [
  { id: 'general', label: 'عمومی', icon: User },
  { id: 'appearance', label: 'ظاهر', icon: Palette },
  { id: 'notifications', label: 'اعلان‌ها', icon: Bell },
  { id: 'language', label: 'زبان', icon: Globe },
  { id: 'security', label: 'امنیت', icon: Shield },
  { id: 'data', label: 'داده', icon: Database },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">تنظیمات</h1>
      <p class="mt-1 text-sm text-muted-foreground">مدیریت تنظیمات سامانه</p>
    </div>

    <div class="flex gap-6 flex-col md:flex-row">
      <div class="w-full md:w-48 space-y-1">
        <button
          v-for="s in sections"
          :key="s.id"
          class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="activeSection === s.id ? 'bg-brand-red/10 text-brand-red' : 'text-muted-foreground hover:bg-accent'"
          @click="activeSection = s.id"
        >
          <component :is="s.icon" class="h-4 w-4" />
          {{ s.label }}
        </button>
      </div>

      <div class="flex-1 space-y-4">
        <BijanCard v-if="activeSection === 'general'">
          <h2 class="text-lg font-semibold">تنظیمات عمومی</h2>
          <div class="mt-4 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">نام سازمان</p>
                <p class="text-xs text-muted-foreground">بیژن هولدینگ</p>
              </div>
              <BijanButton variant="outline" size="sm">ویرایش</BijanButton>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">منطقه زمانی</p>
                <p class="text-xs text-muted-foreground">(UTC+03:30) تهران</p>
              </div>
              <BijanButton variant="outline" size="sm">تغییر</BijanButton>
            </div>
          </div>
        </BijanCard>

        <BijanCard v-if="activeSection === 'appearance'">
          <h2 class="text-lg font-semibold">ظاهر</h2>
          <div class="mt-4 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">حالت نمایش</p>
                <p class="text-xs text-muted-foreground">{{ isDark ? 'تاریک' : 'روشن' }}</p>
              </div>
              <BijanThemeToggle />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">رنگ اصلی</p>
                <p class="text-xs text-muted-foreground">قرمز بیژن (#C41E3A)</p>
              </div>
              <div class="flex gap-1">
                <span class="h-6 w-6 rounded-full bg-brand-red cursor-pointer ring-2 ring-offset-2 ring-brand-red" />
                <span class="h-6 w-6 rounded-full bg-brand-green cursor-pointer" />
                <span class="h-6 w-6 rounded-full bg-brand-gold cursor-pointer" />
              </div>
            </div>
          </div>
        </BijanCard>

        <BijanCard v-if="activeSection === 'language'">
          <h2 class="text-lg font-semibold">زبان</h2>
          <div class="mt-4 space-y-3">
            <button
              class="flex w-full items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
              :class="currentLocale === 'fa-IR' ? 'border-brand-red' : ''"
              @click="setLocale('fa-IR')"
            >
              <div class="flex items-center gap-3">
                <span class="text-lg">🇮🇷</span>
                <div class="text-right">
                  <p class="text-sm font-medium">فارسی</p>
                  <p class="text-xs text-muted-foreground">Persian</p>
                </div>
              </div>
              <div v-if="currentLocale === 'fa-IR'" class="h-5 w-5 rounded-full bg-brand-red flex items-center justify-center">
                <span class="text-white text-xs">✓</span>
              </div>
            </button>
            <button
              class="flex w-full items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
              :class="currentLocale === 'en-US' ? 'border-brand-red' : ''"
              @click="setLocale('en-US')"
            >
              <div class="flex items-center gap-3">
                <span class="text-lg">🇺🇸</span>
                <div class="text-right">
                  <p class="text-sm font-medium">English</p>
                  <p class="text-xs text-muted-foreground">انگلیسی</p>
                </div>
              </div>
              <div v-if="currentLocale === 'en-US'" class="h-5 w-5 rounded-full bg-brand-red flex items-center justify-center">
                <span class="text-white text-xs">✓</span>
              </div>
            </button>
          </div>
        </BijanCard>

        <BijanCard v-if="activeSection === 'notifications'">
          <h2 class="text-lg font-semibold">اعلان‌ها</h2>
          <div class="mt-4 space-y-4">
            <div v-for="(item, i) in ['هشدارهای بحرانی', 'هشدارهای تولید', 'گزارشات روزانه', 'به‌روزرسانی سیستم']" :key="i" class="flex items-center justify-between">
              <span class="text-sm">{{ item }}</span>
              <div class="h-6 w-11 rounded-full bg-muted relative cursor-pointer" :class="i < 2 ? 'bg-brand-red' : ''">
                <div class="h-5 w-5 rounded-full bg-white absolute top-0.5 shadow transition-transform" :class="i < 2 ? 'left-0.5' : 'right-0.5'" />
              </div>
            </div>
          </div>
        </BijanCard>

        <BijanCard v-if="activeSection === 'security'">
          <h2 class="text-lg font-semibold">امنیت</h2>
          <div class="mt-4 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">نوع احراز هویت</p>
                <p class="text-xs text-muted-foreground">نام کاربری و رمز عبور</p>
              </div>
              <BijanButton variant="outline" size="sm">تغییر</BijanButton>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">نشست کاربری</p>
                <p class="text-xs text-muted-foreground">مدت اعتبار: ۲۴ ساعت</p>
              </div>
              <BijanButton variant="outline" size="sm">ویرایش</BijanButton>
            </div>
          </div>
        </BijanCard>

        <BijanCard v-if="activeSection === 'data'">
          <h2 class="text-lg font-semibold">مدیریت داده</h2>
          <div class="mt-4 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">پشتیبان‌گیری</p>
                <p class="text-xs text-muted-foreground">آخرین: ۱۴۰۵/۰۴/۱۱</p>
              </div>
              <BijanButton variant="outline" size="sm">
                <RefreshCw class="h-4 w-4" />
                پشتیبان جدید
              </BijanButton>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">بازیابی اطلاعات</p>
                <p class="text-xs text-muted-foreground">بازیابی از آخرین پشتیبان</p>
              </div>
              <BijanButton variant="outline" size="sm">بازیابی</BijanButton>
            </div>
          </div>
        </BijanCard>
      </div>
    </div>
  </div>
</template>
