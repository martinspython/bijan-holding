import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Employee } from '@bijan/types'
import { mockEmployees } from '../mock/data'

export const useHRStore = defineStore('hr', () => {
  const employees = ref<Employee[]>([])
  const loading = ref(false)

  async function fetchEmployees(): Promise<void> {
    loading.value = true
    await new Promise((r) => setTimeout(r, 500))
    employees.value = [...mockEmployees]
    loading.value = false
  }

  return { employees, loading, fetchEmployees }
})
