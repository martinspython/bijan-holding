<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { cn, formatNumber } from '../utils'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  render?: (row: T) => string
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface Props<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  pageSize?: number
  selectable?: boolean
  emptyMessage?: string
}

const props = withDefaults(defineProps<Props<Record<string, unknown>>>(), {
  loading: false,
  pageSize: 20,
  selectable: false,
  emptyMessage: 'داده‌ای یافت نشد',
})

const emit = defineEmits<{
  'row-click': [row: Record<string, unknown>]
  'selection-change': [selected: Set<string>]
}>()

const currentPage = ref(1)
const sortKey = ref<string | null>(null)
const sortDir = ref<'asc' | 'desc'>('asc')
const searchQuery = ref('')
const selectedRows = ref<Set<string>>(new Set())

const filteredData = computed(() => {
  let result = props.data
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((row) =>
      props.columns.some((col) => {
        const val = String(row[col.key] ?? '').toLowerCase()
        return val.includes(q)
      }),
    )
  }
  if (sortKey.value) {
    result = [...result].sort((a, b) => {
      const aVal = a[sortKey.value!]
      const bVal = b[sortKey.value!]
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir.value === 'asc' ? aVal - bVal : bVal - aVal
      }
      const cmp = String(aVal).localeCompare(String(bVal))
      return sortDir.value === 'asc' ? cmp : -cmp
    })
  }
  return result
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.pageSize))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return filteredData.value.slice(start, start + props.pageSize)
})

function toggleSort(key: string): void {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

function toggleSelect(row: Record<string, unknown>, id: string): void {
  if (selectedRows.value.has(id)) {
    selectedRows.value.delete(id)
  } else {
    selectedRows.value.add(id)
  }
  emit('selection-change', selectedRows.value)
}

function selectAll(): void {
  if (selectedRows.value.size === paginatedData.value.length) {
    selectedRows.value.clear()
  } else {
    paginatedData.value.forEach((row) => selectedRows.value.add(String(row.id)))
  }
  emit('selection-change', selectedRows.value)
}
</script>

<template>
  <div class="w-full">
    <div v-if="columns.some((c) => c.filterable)" class="mb-4 flex items-center gap-2">
      <div class="relative flex-1 max-w-sm">
        <Search class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="جستجو..."
          class="h-10 w-full rounded-lg border bg-background pr-10 pl-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="جستجو در جدول"
        />
      </div>
    </div>

    <div class="overflow-x-auto rounded-xl border">
      <table class="w-full text-sm" role="grid">
        <thead class="bg-muted/50">
          <tr>
            <th v-if="selectable" class="w-10 px-3 py-3 text-right">
              <input
                type="checkbox"
                :checked="selectedRows.size === paginatedData.length && paginatedData.length > 0"
                :indeterminate="selectedRows.size > 0 && selectedRows.size < paginatedData.length"
                @change="selectAll"
                aria-label="انتخاب همه"
              />
            </th>
            <th
              v-for="col in columns"
              :key="col.key"
              :class="cn(
                'px-3 py-3 text-sm font-medium text-muted-foreground',
                col.sortable && 'cursor-pointer select-none hover:text-foreground',
                col.align === 'center' && 'text-center',
                col.align === 'left' && 'text-left',
                !col.align && 'text-right',
              )"
              :style="col.width ? { width: col.width } : {}"
              @click="col.sortable && toggleSort(col.key)"
              :aria-sort="sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'"
            >
              <span class="inline-flex items-center gap-1">
                {{ col.label }}
                <span v-if="col.sortable && sortKey === col.key" class="inline-flex flex-col">
                  <ChevronUp :class="['h-3 w-3', sortDir === 'asc' ? 'text-foreground' : 'text-muted-foreground/50']" />
                  <ChevronDown :class="['h-3 w-3 -mt-1', sortDir === 'desc' ? 'text-foreground' : 'text-muted-foreground/50']" />
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="columns.length + (selectable ? 1 : 0)" class="p-8 text-center text-muted-foreground">
              در حال بارگذاری...
            </td>
          </tr>
          <tr v-else-if="paginatedData.length === 0">
            <td :colspan="columns.length + (selectable ? 1 : 0)" class="p-8 text-center text-muted-foreground">
              {{ emptyMessage }}
            </td>
          </tr>
          <tr
            v-for="(row, i) in paginatedData"
            :key="String(row.id ?? i)"
            class="border-t border-border transition-colors hover:bg-muted/30 cursor-pointer"
            @click="emit('row-click', row)"
          >
            <td v-if="selectable" class="px-3 py-2.5" @click.stop>
              <input
                type="checkbox"
                :checked="selectedRows.has(String(row.id))"
                @change="toggleSelect(row, String(row.id))"
                :aria-label="'انتخاب ردیف'"
              />
            </td>
            <td
              v-for="col in columns"
              :key="col.key"
              :class="cn(
                'px-3 py-2.5',
                col.align === 'center' && 'text-center',
                col.align === 'left' && 'text-left',
              )"
            >
              <template v-if="col.render">
                {{ col.render(row) }}
              </template>
              <template v-else>
                {{ typeof row[col.key] === 'number' ? formatNumber(row[col.key] as number) : row[col.key] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPages > 1" class="mt-4 flex items-center justify-between">
      <span class="text-sm text-muted-foreground">
        صفحه {{ currentPage }} از {{ totalPages }}
      </span>
      <div class="flex items-center gap-1">
        <button
          class="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
          :disabled="currentPage <= 1"
          @click="currentPage--"
          aria-label="صفحه قبلی"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
        <button
          v-for="p in Math.min(totalPages, 7)"
          :key="p"
          :class="cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            currentPage === p ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent',
          )"
          @click="currentPage = p"
          :aria-current="currentPage === p ? 'page' : undefined"
        >
          {{ p }}
        </button>
        <button
          class="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
          :disabled="currentPage >= totalPages"
          @click="currentPage++"
          aria-label="صفحه بعدی"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
