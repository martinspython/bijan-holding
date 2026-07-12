<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { BijanCard, BijanBadge, BijanModal, BijanTimeline, BijanSkeleton } from '@bijan/ui'
import { useContractStore } from '../stores/contracts'
import type { Contract } from '../types/commercial'
import {
  FileText, Clock, AlertTriangle, CheckCircle, XCircle, Search,
  ChevronLeft, ExternalLink, Download, Eye, Calendar,
} from 'lucide-vue-next'

const store = useContractStore()
const searchQuery = ref('')
const selectedStatus = ref<string | null>(null)
const showDetail = ref(false)

onMounted(() => { store.fetchContracts() })

const statusVariant = (status: string) => {
  switch (status) {
    case 'active': return 'success' as const
    case 'draft': return 'default' as const
    case 'expired': return 'warning' as const
    case 'terminated': return 'error' as const
    case 'pending-renewal': return 'warning' as const
    default: return 'default' as const
  }
}

const statusLabel: Record<string, string> = {
  active: 'فعال', draft: 'پیش‌نویس', expired: 'منقضی',
  terminated: 'فسخ شده', 'pending-renewal': 'در انتظار تمدید',
}

const filteredContracts = computed(() => {
  let result = store.contracts
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((c) =>
      c.title.toLowerCase().includes(q) || c.contractNumber.toLowerCase().includes(q) || c.supplierName.toLowerCase().includes(q),
    )
  }
  if (selectedStatus.value) {
    result = result.filter((c) => c.status === selectedStatus.value)
  }
  return result
})

function viewDetail(contract: Contract): void {
  store.selectContract(contract.id)
  showDetail.value = true
}

const mileSeverity = (s: string) => {
  switch (s) {
    case 'completed': return 'success' as const
    case 'overdue': return 'error' as const
    default: return 'info' as const
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">قراردادها</h1>
      <p class="mt-1 text-sm text-muted-foreground">مدیریت {{ store.contracts.length }} قرارداد تدارکات</p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <div class="relative flex-1 min-w-[200px] max-w-sm">
        <Search class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input v-model="searchQuery" type="text" placeholder="جستجوی قرارداد..."
          class="h-10 w-full rounded-lg border bg-background pr-10 pl-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="جستجوی قرارداد" />
      </div>
      <select v-model="selectedStatus"
        class="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="فیلتر وضعیت">
        <option :value="null">همه وضعیت‌ها</option>
        <option value="active">فعال</option>
        <option value="draft">پیش‌نویس</option>
        <option value="expired">منقضی</option>
        <option value="terminated">فسخ شده</option>
        <option value="pending-renewal">در انتظار تمدید</option>
      </select>
    </div>

    <div v-if="store.loading" class="space-y-3">
      <BijanSkeleton v-for="i in 5" :key="i" variant="card" height="100px" />
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="contract in filteredContracts" :key="contract.id"
        class="flex items-start gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-md cursor-pointer"
        @click="viewDetail(contract)"
      >
        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-red/10">
          <FileText class="h-6 w-6 text-brand-red" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-semibold">{{ contract.title }}</p>
              <p class="text-xs text-muted-foreground">{{ contract.contractNumber }} - {{ contract.supplierName }}</p>
            </div>
            <BijanBadge :variant="statusVariant(contract.status)" size="sm">
              {{ statusLabel[contract.status] }}
            </BijanBadge>
          </div>
          <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>{{ contract.category }}</span>
            <span>{{ (contract.value / 1000000000).toFixed(1) }} میلیارد ریال</span>
            <span class="flex items-center gap-1">
              <Calendar class="h-3 w-3" />
              {{ contract.startDate }} تا {{ contract.endDate }}
            </span>
            <span v-if="contract.riskFlags.length" class="flex items-center gap-1 text-red-500">
              <AlertTriangle class="h-3 w-3" />
              {{ contract.riskFlags.length }} ریسک
            </span>
          </div>
          <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div class="h-full rounded-full bg-brand-green transition-all"
              :style="{ width: `${contract.slaScore}%` }" />
          </div>
        </div>
        <ChevronLeft class="h-5 w-5 shrink-0 text-muted-foreground" />
      </div>
    </div>

    <BijanModal :open="showDetail && !!store.selectedContract" @close="showDetail = false">
      <template #default>
        <div v-if="store.selectedContract" class="space-y-6">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-xl font-bold">{{ store.selectedContract.title }}</h2>
              <p class="text-sm text-muted-foreground">{{ store.selectedContract.contractNumber }}</p>
            </div>
            <BijanBadge :variant="statusVariant(store.selectedContract.status)">
              {{ statusLabel[store.selectedContract.status] }}
            </BijanBadge>
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><span class="text-muted-foreground">تأمین‌کننده:</span> {{ store.selectedContract.supplierName }}</div>
            <div><span class="text-muted-foreground">دسته‌بندی:</span> {{ store.selectedContract.category }}</div>
            <div><span class="text-muted-foreground">نوع:</span> {{ store.selectedContract.type === 'fixed' ? 'ثابت' : store.selectedContract.type === 'cost-plus' ? 'هزینه به اضافه' : store.selectedContract.type === 'time-material' ? 'زمان-مواد' : 'چارچوب' }}</div>
            <div><span class="text-muted-foreground">ارزش:</span> {{ (store.selectedContract.value / 1000000000).toFixed(1) }} میلیارد ریال</div>
            <div><span class="text-muted-foreground">شروع:</span> {{ store.selectedContract.startDate }}</div>
            <div><span class="text-muted-foreground">پایان:</span> {{ store.selectedContract.endDate }}</div>
          </div>

          <div v-if="store.selectedContract.riskFlags.length">
            <h3 class="text-sm font-semibold mb-2 flex items-center gap-1">
              <AlertTriangle class="h-4 w-4 text-red-500" /> ریسک‌ها
            </h3>
            <div class="flex flex-wrap gap-2">
              <BijanBadge v-for="flag in store.selectedContract.riskFlags" :key="flag" variant="error" size="sm">
                {{ flag }}
              </BijanBadge>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold mb-3">مراحل کلیدی</h3>
            <div class="space-y-2">
              <div v-for="ms in store.selectedContract.milestones" :key="ms.id"
                class="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p class="text-sm font-medium">{{ ms.title }}</p>
                  <p class="text-xs text-muted-foreground">{{ ms.description }}</p>
                </div>
                <div class="text-left">
                  <BijanBadge :variant="mileSeverity(ms.status)" size="sm">
                    {{ ms.status === 'completed' ? 'تکمیل' : ms.status === 'overdue' ? 'مهلت گذشته' : 'در انتظار' }}
                  </BijanBadge>
                  <p class="text-[10px] text-muted-foreground mt-1">مهلت: {{ ms.dueDate }}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold mb-2">یادداشت‌ها</h3>
            <p class="text-sm text-muted-foreground">{{ store.selectedContract.notes }}</p>
          </div>
        </div>
      </template>
    </BijanModal>
  </div>
</template>
