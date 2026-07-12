<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const stored = localStorage.getItem('bijan-theme')
  if (stored === 'dark') {
    document.documentElement.classList.add('dark')
  }
  const locale = localStorage.getItem('bijan-locale')
  if (locale) {
    document.documentElement.dir = locale === 'fa-IR' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }
})
</script>

<template>
  <RouterView />
</template>
