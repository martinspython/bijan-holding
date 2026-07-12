<script setup lang="ts">
import { ref } from 'vue'
import { BijanCard, BijanButton, BijanThemeToggle } from '@bijan/ui'
import {
  Settings, User, Bell, Globe, Shield, Palette, Save,
} from 'lucide-vue-next'

const activeTab = ref<'profile' | 'notifications' | 'preferences'>('profile')
const displayName = ref('مدیر بازرگانی')
const email = ref('procurement@bijan.ir')
const language = ref('fa')
const darkMode = ref(false)
const saved = ref(false)

function saveSettings(): void {
  saved.value = true
  setTimeout(() => { saved.value = false }, 2500)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">تنظیمات</h1>
      <p class="mt-1 text-sm text-muted-foreground">مدیریت حساب کاربری و تنظیمات سامانه</p>
    </div>

    <div class="flex gap-2 border-b pb-px">
      <button
        v-for="tab in ([
          { key: 'profile', label: 'پروفایل', icon: User },
          { key: 'notifications', label: 'اعلان‌ها', icon: Bell },
          { key: 'preferences', label: 'تنظیمات', icon: Palette },
        ] as const)" :key="tab.key"
        class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px"
        :class="activeTab === tab.key ? 'border-brand-red text-brand-red' : 'border-transparent text-muted-foreground hover:text-foreground'"
        @click="activeTab = tab.key"
      >
        <component :is="tab.icon" class="h-4 w-4" />
        {{ tab.label }}
      </button>
    </div>

    <div v-if="activeTab === 'profile'" class="max-w-lg space-y-4">
      <BijanCard>
        <template #default>
          <h2 class="text-lg font-semibold mb-4">اطلاعات حساب</h2>
          <div class="space-y-4">
            <div>
              <label class="mb-1.5 block text-sm font-medium">نام نمایشی</label>
              <input v-model="displayName" type="text"
                class="h-10 w-full rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="نام نمایشی" />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium">ایمیل</label>
              <input v-model="email" type="email"
                class="h-10 w-full rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="ایمیل" />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium">سمت</label>
              <input type="text" value="مدیر تدارکات" disabled
                class="h-10 w-full rounded-lg border bg-muted px-3 text-sm" />
            </div>
            <BijanButton @click="saveSettings">
              <Save class="h-4 w-4 ml-2" />
              ذخیره تغییرات
            </BijanButton>
            <p v-if="saved" class="text-sm text-green-600">تغییرات ذخیره شد</p>
          </div>
        </template>
      </BijanCard>
    </div>

    <div v-if="activeTab === 'notifications'" class="max-w-lg space-y-4">
      <BijanCard>
        <template #default>
          <h2 class="text-lg font-semibold mb-4">تنظیمات اعلان‌ها</h2>
          <div class="space-y-4">
            <label class="flex items-center justify-between rounded-lg border p-3 cursor-pointer">
              <div>
                <p class="text-sm font-medium">تأیید سفارشات خرید</p>
                <p class="text-xs text-muted-foreground">اعلان برای سفارشات نیازمند تأیید</p>
              </div>
              <input type="checkbox" checked class="h-4 w-4 rounded border-gray-300" />
            </label>
            <label class="flex items-center justify-between rounded-lg border p-3 cursor-pointer">
              <div>
                <p class="text-sm font-medium">تمدید قراردادها</p>
                <p class="text-xs text-muted-foreground">یادآوری تمدید قراردادهای در شرف اتمام</p>
              </div>
              <input type="checkbox" checked class="h-4 w-4 rounded border-gray-300" />
            </label>
            <label class="flex items-center justify-between rounded-lg border p-3 cursor-pointer">
              <div>
                <p class="text-sm font-medium">ریسک تأمین‌کنندگان</p>
                <p class="text-xs text-muted-foreground">هشدار تغییر سطح ریسک تأمین‌کنندگان</p>
              </div>
              <input type="checkbox" checked class="h-4 w-4 rounded border-gray-300" />
            </label>
            <label class="flex items-center justify-between rounded-lg border p-3 cursor-pointer">
              <div>
                <p class="text-sm font-medium">اختلال زنجیره تأمین</p>
                <p class="text-xs text-muted-foreground">اعلان اختلال در مسیرهای لجستیک</p>
              </div>
              <input type="checkbox" checked class="h-4 w-4 rounded border-gray-300" />
            </label>
          </div>
        </template>
      </BijanCard>
    </div>

    <div v-if="activeTab === 'preferences'" class="max-w-lg space-y-4">
      <BijanCard>
        <template #default>
          <h2 class="text-lg font-semibold mb-4">تنظیمات سامانه</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p class="text-sm font-medium">حالت تاریک</p>
                <p class="text-xs text-muted-foreground">تغییر تم سامانه به حالت تاریک</p>
              </div>
              <BijanThemeToggle />
            </div>
            <div class="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p class="text-sm font-medium">زبان</p>
                <p class="text-xs text-muted-foreground">زبان رابط کاربری</p>
              </div>
              <select v-model="language"
                class="h-9 rounded-lg border bg-background px-3 text-sm">
                <option value="fa">فارسی</option>
                <option value="en">English</option>
              </select>
            </div>
            <div class="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p class="text-sm font-medium">ارز پیش‌فرض</p>
                <p class="text-xs text-muted-foreground">واحد پول نمایش داده شده در سامانه</p>
              </div>
              <select class="h-9 rounded-lg border bg-background px-3 text-sm">
                <option>ریال (IRR)</option>
                <option>دلار (USD)</option>
                <option>یورو (EUR)</option>
              </select>
            </div>
            <BijanButton @click="saveSettings">
              <Save class="h-4 w-4 ml-2" />
              ذخیره تنظیمات
            </BijanButton>
          </div>
        </template>
      </BijanCard>
    </div>
  </div>
</template>
