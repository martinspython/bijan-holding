import { ref } from 'vue'
import type { Notification } from '@bijan/types'

const notifications = ref<Notification[]>([])

export function useNotifications() {
  function add(notification: Notification): void {
    notifications.value.unshift(notification)
    if (notifications.value.length > 50) {
      notifications.value = notifications.value.slice(0, 50)
    }
  }

  function remove(id: string): void {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  function markRead(id: string): void {
    const n = notifications.value.find((n) => n.id === id)
    if (n) n.read = true
  }

  function markAllRead(): void {
    notifications.value.forEach((n) => { n.read = true })
  }

  function clear(): void {
    notifications.value = []
  }

  const unreadCount = () => notifications.value.filter((n) => !n.read).length

  return {
    notifications,
    add,
    remove,
    markRead,
    markAllRead,
    clear,
    unreadCount,
  }
}
