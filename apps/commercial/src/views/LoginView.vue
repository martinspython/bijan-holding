<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BijanButton } from '@bijan/ui'
import { ShoppingBag } from 'lucide-vue-next'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin(): Promise<void> {
  if (!username.value || !password.value) {
    error.value = 'لطفا نام کاربری و رمز عبور را وارد کنید'
    return
  }
  loading.value = true
  error.value = ''
  await new Promise((r) => setTimeout(r, 800))
  if (username.value === 'commercial' && password.value === 'commercial') {
    localStorage.setItem('bijan-commercial-token', 'mock-token')
    localStorage.setItem('bijan-commercial-user', JSON.stringify({
      id: '1', name: 'مدیر بازرگانی', role: 'procurement-manager',
    }))
    await router.push('/dashboard')
  } else {
    error.value = 'نام کاربری یا رمز عبور incorrect است'
  }
  loading.value = false
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-red/10 via-background to-brand-gold/10 p-4">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red shadow-lg">
          <ShoppingBag class="h-8 w-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold">دفتر بازرگانی بیژن</h1>
        <p class="mt-1 text-sm text-muted-foreground">سکوی هوشمند تدارکات و زنجیره تأمین</p>
      </div>

      <div class="rounded-xl border bg-card p-6 shadow-lg">
        <form @submit.prevent="handleLogin">
          <div class="space-y-4">
            <div>
              <label for="username" class="mb-1.5 block text-sm font-medium">نام کاربری</label>
              <input id="username" v-model="username" type="text"
                class="h-11 w-full rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="commercial" autocomplete="username" />
            </div>
            <div>
              <label for="password" class="mb-1.5 block text-sm font-medium">رمز عبور</label>
              <input id="password" v-model="password" type="password"
                class="h-11 w-full rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="commercial" autocomplete="current-password" />
            </div>
          </div>

          <p v-if="error" class="mt-3 text-sm text-red-500" role="alert">{{ error }}</p>

          <BijanButton type="submit" class="mt-6 w-full" :loading="loading" size="lg">
            ورود به سامانه
          </BijanButton>
        </form>

        <p class="mt-4 text-center text-xs text-muted-foreground">
          دمو: commercial / commercial
        </p>
      </div>
    </div>
  </div>
</template>
