<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { BijanCard, BijanBadge, BijanTimeline, BijanSkeleton } from '@bijan/ui'
import { useCommercialAnalyticsStore } from '../stores/analytics'
import type { NegotiationSession } from '../types/commercial'
import {
  BrainCircuit, Target, TrendingUp, AlertTriangle, Lightbulb,
  MessageSquare, CheckCircle, XCircle, ChevronLeft,
} from 'lucide-vue-next'

const store = useCommercialAnalyticsStore()
const selectedNegId = ref<string | null>(null)

onMounted(() => { store.fetchAll() })

const selectedNeg = computed(() =>
  store.negotiations.find((n) => n.id === selectedNegId.value) ?? null,
)

const stageLabel: Record<string, string> = {
  preparation: 'آماده‌سازی', opening: 'افتتاحیه', bidding: 'مناقصه',
  closing: 'نهایی‌سازی', awarded: 'اعطا شده', failed: 'ناموفق',
}

const stageVariant = (s: string) => {
  switch (s) {
    case 'closing': return 'warning' as const
    case 'awarded': return 'success' as const
    case 'failed': return 'error' as const
    default: return 'default' as const
  }
}

const insightIcon = (type: string) => {
  switch (type) {
    case 'opportunity': return TrendingUp
    case 'risk': return AlertTriangle
    case 'strategy': return Lightbulb
    case 'benchmark': return Target
    default: return Lightbulb
  }
}

const insightColor = (type: string) => {
  switch (type) {
    case 'opportunity': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
    case 'risk': return 'text-red-500 bg-red-100 dark:bg-red-900/30'
    case 'strategy': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
    default: return 'text-amber-500 bg-amber-100 dark:bg-amber-900/30'
  }
}

function selectNeg(id: string): void {
  selectedNegId.value = selectedNegId.value === id ? null : id
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">دستیار هوشمند مذاکره</h1>
      <p class="mt-1 text-sm text-muted-foreground">هدایت و تحلیل هوشمند جلسات مذاکره با تأمین‌کنندگان</p>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div class="lg:col-span-1 space-y-3">
        <h2 class="text-sm font-semibold">مذاکرات فعال</h2>
        <div
          v-for="neg in store.negotiations" :key="neg.id"
          class="rounded-xl border bg-card p-4 transition-all hover:shadow-md cursor-pointer"
          :class="selectedNegId === neg.id ? 'ring-2 ring-brand-red' : ''"
          @click="selectNeg(neg.id)"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10">
              <MessageSquare class="h-5 w-5 text-brand-red" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate">{{ neg.title }}</p>
              <p class="text-xs text-muted-foreground truncate">{{ neg.supplierName }}</p>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <BijanBadge :variant="stageVariant(neg.stage)" size="sm">
              {{ stageLabel[neg.stage] }}
            </BijanBadge>
            <span class="text-[10px] text-muted-foreground">
              {{ neg.aiInsights.length }} تحلیل
            </span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-4">
        <div v-if="!selectedNeg" class="flex items-center justify-center h-64 text-muted-foreground">
          <div class="text-center">
            <BrainCircuit class="mx-auto mb-3 h-12 w-12 opacity-50" />
            <p>یک مذاکره را انتخاب کنید</p>
          </div>
        </div>

        <template v-if="selectedNeg">
          <BijanCard>
            <template #default>
              <h2 class="text-lg font-semibold mb-3">تحلیل‌های هوشمند</h2>
              <div v-if="!selectedNeg.aiInsights.length" class="text-sm text-muted-foreground">
                هیچ تحلیلی ثبت نشده است
              </div>
              <div v-for="insight in selectedNeg.aiInsights" :key="insight.id"
                class="mb-3 rounded-lg border p-4">
                <div class="flex items-start gap-3">
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    :class="insightColor(insight.type)">
                    <component :is="insightIcon(insight.type)" class="h-4 w-4" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <p class="text-sm font-semibold">{{ insight.title }}</p>
                      <BijanBadge
                        :variant="insight.priority === 'high' ? 'error' : insight.priority === 'medium' ? 'warning' : 'default'"
                        size="sm">
                        {{ insight.priority === 'high' ? 'بالا' : insight.priority === 'medium' ? 'متوسط' : 'پایین' }}
                      </BijanBadge>
                    </div>
                    <p class="text-sm text-muted-foreground">{{ insight.description }}</p>
                    <p class="mt-1 text-[10px] text-muted-foreground">
                      اطمینان: {{ (insight.confidenceScore * 100).toFixed(0) }}%
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </BijanCard>

          <BijanCard>
            <template #default>
              <h2 class="text-lg font-semibold mb-3">اقلام مذاکره</h2>
              <div class="space-y-3">
                <div v-for="item in selectedNeg.items" :key="item.id"
                  class="rounded-lg border p-3">
                  <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium">{{ item.label }}</p>
                    <BijanBadge :variant="item.status === 'agreed' ? 'success' : item.status === 'conceded' ? 'warning' : 'default'" size="sm">
                      {{ item.status === 'agreed' ? 'توافق' : item.status === 'conceded' ? 'مصالحه' : 'در حال مذاکره' }}
                    </BijanBadge>
                  </div>
                  <div class="grid grid-cols-3 gap-2 text-xs text-center">
                    <div>
                      <p class="font-bold text-brand-green">{{ item.targetValue.toLocaleString('fa-IR') }}</p>
                      <p class="text-muted-foreground">هدف</p>
                    </div>
                    <div>
                      <p class="font-bold">{{ item.currentOffer.toLocaleString('fa-IR') }}</p>
                      <p class="text-muted-foreground">پیشنهاد فعلی</p>
                    </div>
                    <div>
                      <p class="font-bold text-brand-red">{{ item.minimumAcceptable.toLocaleString('fa-IR') }}</p>
                      <p class="text-muted-foreground">حداقل قابل قبول</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </BijanCard>

          <BijanCard>
            <template #default>
              <h2 class="text-lg font-semibold mb-3">جدول زمانی مذاکره</h2>
              <div class="space-y-2">
                <div v-for="event in selectedNeg.timeline" :key="event.id"
                  class="flex items-start gap-3 border-r-2 border-muted pr-4 pb-3">
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <p class="text-sm font-medium">{{ event.title }}</p>
                      <span class="text-[10px] text-muted-foreground">{{ event.date }}</span>
                    </div>
                    <p class="text-xs text-muted-foreground">{{ event.description }}</p>
                    <p class="text-[10px] text-muted-foreground mt-0.5">توسط: {{ event.user }}</p>
                  </div>
                </div>
              </div>
            </template>
          </BijanCard>
        </template>
      </div>
    </div>
  </div>
</template>
