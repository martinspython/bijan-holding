import { ref, watch, onMounted } from 'vue'
import { usePreferredDark, useColorMode } from '@vueuse/core'

const isDark = ref(false)
const resolved = ref(false)

export function useTheme() {
  const preferredDark = usePreferredDark()

  function init(): void {
    const stored = localStorage.getItem('bijan-theme')
    if (stored === 'dark' || (stored === null && preferredDark.value)) {
      document.documentElement.classList.add('dark')
      isDark.value = true
    } else {
      document.documentElement.classList.remove('dark')
      isDark.value = false
    }
    resolved.value = true
  }

  function toggle(): void {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('bijan-theme', isDark.value ? 'dark' : 'light')
  }

  function setTheme(mode: 'light' | 'dark'): void {
    isDark.value = mode === 'dark'
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('bijan-theme', mode)
  }

  onMounted(() => {
    if (!resolved.value) init()
  })

  return {
    isDark,
    resolved,
    init,
    toggle,
    setTheme,
  }
}
