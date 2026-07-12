<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Truck, Navigation } from 'lucide-vue-next'

const router = useRouter()
const code = ref('')
const error = ref('')
const loading = ref(false)

async function login(): Promise<void> {
  if (!code.value) {
    error.value = 'لطفا کد راننده را وارد کنید'
    return
  }
  loading.value = true
  error.value = ''
  await new Promise((r) => setTimeout(r, 600))
  if (code.value === '1234' || code.value === 'driver') {
    localStorage.setItem('bijan-driver-token', 'mock-driver-token')
    localStorage.setItem('bijan-driver', JSON.stringify({ id: 'd-1', name: 'رضا مرادی', code: code.value }))
    await router.push('/dashboard')
  } else {
    error.value = 'کد راننده نامعتبر است'
  }
  loading.value = false
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-brand-red to-brand-red-dark p-6">
    <div class="mb-8 text-center">
      <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
        <Truck class="h-10 w-10 text-white" />
      </div>
      <h1 class="text-2xl font-bold text-white">راننده بیژن</h1>
      <p class="mt-1 text-sm text-white/70">سامانه مدیریت ناوگان حمل و نقل</p>
    </div>

    <div class="w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-md p-6">
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="code" class="mb-1.5 block text-sm font-medium text-white/90">کد راننده</label>
          <input
            id="code"
            v-model="code"
            type="text"
            class="h-12 w-full rounded-xl bg-white/20 px-4 text-center text-lg font-bold text-white tracking-widest placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="_ _ _ _"
            maxlength="4"
            autocomplete="off"
            inputmode="numeric"
          />
        </div>

        <p v-if="error" class="mb-3 text-center text-sm text-amber-200">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-brand-red transition-all active:scale-95 disabled:opacity-70"
        >
          <Navigation v-if="!loading" class="h-5 w-5" />
          <span v-if="loading">لطفا صبر کنید...</span>
          <span v-else>ورود</span>
        </button>
      </form>

      <p class="mt-4 text-center text-xs text-white/50">دمو: 1234</p>
    </div>
  </div>
</template>
