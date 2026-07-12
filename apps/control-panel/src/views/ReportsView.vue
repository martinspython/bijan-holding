<script setup lang="ts">
import { BijanCard, BijanButton, BijanBadge } from '@bijan/ui'
import { FileText, Download, Printer, Calendar } from 'lucide-vue-next'

const reports = [
  { id: 'r-1', title: 'گزارش عملکرد ماهانه تولید', type: 'PDF', date: '۱۴۰۵/۰۴/۱۰', size: '۲.۴ MB', category: 'تولید' },
  { id: 'r-2', title: 'گزارش فروش هفتگی', type: 'Excel', date: '۱۴۰۵/۰۴/۱۱', size: '۱.۸ MB', category: 'فروش' },
  { id: 'r-3', title: 'گزارش ناوگان و توزیع', type: 'PDF', date: '۱۴۰۵/۰۴/۰۹', size: '۳.۱ MB', category: 'توزیع' },
  { id: 'r-4', title: 'تحلیل هزینه‌های تولید', type: 'Excel', date: '۱۴۰۵/۰۴/۰۸', size: '۱.۲ MB', category: 'مالی' },
  { id: 'r-5', title: 'گزارش OEE خطوط تولید', type: 'PDF', date: '۱۴۰۵/۰۴/۱۱', size: '۴.۵ MB', category: 'تولید' },
  { id: 'r-6', title: 'گزارش موجودی انبار', type: 'Excel', date: '۱۴۰۵/۰۴/۰۷', size: '۲.۰ MB', category: 'انبار' },
  { id: 'r-7', title: 'گزارش پرسنلی ماهانه', type: 'PDF', date: '۱۴۰۵/۰۴/۰۵', size: '۱.۵ MB', category: 'منابع انسانی' },
  { id: 'r-8', title: 'گزارش کیفیت محصولات', type: 'PDF', date: '۱۴۰۵/۰۴/۱۰', size: '۳.۸ MB', category: 'کیفیت' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">گزارشات</h1>
        <p class="mt-1 text-sm text-muted-foreground">گزارشات آماده و قابل سفارشی‌سازی</p>
      </div>
      <BijanButton>
        <Calendar class="h-4 w-4" />
        گزارش جدید
      </BijanButton>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <BijanCard v-for="report in reports" :key="report.id" hover>
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <FileText class="h-5 w-5 text-brand-red" />
            </div>
            <div>
              <h3 class="text-sm font-semibold">{{ report.title }}</h3>
              <p class="text-xs text-muted-foreground">
                {{ report.category }} - {{ report.date }}
              </p>
            </div>
          </div>
          <BijanBadge :variant="report.type === 'PDF' ? 'destructive' : 'success'">
            {{ report.type }}
          </BijanBadge>
        </div>
        <div class="mt-3 flex items-center justify-between border-t pt-3">
          <span class="text-xs text-muted-foreground">{{ report.size }}</span>
          <div class="flex gap-1">
            <button class="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="دانلود">
              <Download class="h-4 w-4" />
            </button>
            <button class="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="چاپ">
              <Printer class="h-4 w-4" />
            </button>
          </div>
        </div>
      </BijanCard>
    </div>
  </div>
</template>
