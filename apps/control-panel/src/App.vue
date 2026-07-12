<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '@bijan/ui'

const { init } = useTheme()

onMounted(() => {
  init()
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
