import { ref } from 'vue'

type Locale = 'fa-IR' | 'en-US'

const currentLocale = ref<Locale>('fa-IR')

const translations: Record<string, Record<Locale, string>> = {
  'nav.dashboard': { 'fa-IR': 'داشبورد', 'en-US': 'Dashboard' },
  'nav.production': { 'fa-IR': 'تولید', 'en-US': 'Production' },
  'nav.fleet': { 'fa-IR': 'ناوگان', 'en-US': 'Fleet' },
  'nav.sales': { 'fa-IR': 'فروش', 'en-US': 'Sales' },
  'nav.hr': { 'fa-IR': 'منابع انسانی', 'en-US': 'HR' },
  'nav.festival': { 'fa-IR': 'فروشگاه‌های زنجیره‌ای', 'en-US': 'Festival Stores' },
  'nav.logistics': { 'fa-IR': 'توزیع', 'en-US': 'Logistics' },
  'nav.analytics': { 'fa-IR': 'تحلیل داده', 'en-US': 'Analytics' },
  'nav.reports': { 'fa-IR': 'گزارشات', 'en-US': 'Reports' },
  'nav.settings': { 'fa-IR': 'تنظیمات', 'en-US': 'Settings' },
  'nav.support': { 'fa-IR': 'پشتیبانی', 'en-US': 'Support' },
  'common.search': { 'fa-IR': 'جستجو...', 'en-US': 'Search...' },
  'common.loading': { 'fa-IR': 'در حال بارگذاری...', 'en-US': 'Loading...' },
  'common.noData': { 'fa-IR': 'داده‌ای یافت نشد', 'en-US': 'No data found' },
  'common.error': { 'fa-IR': 'خطا', 'en-US': 'Error' },
  'common.retry': { 'fa-IR': 'تلاش مجدد', 'en-US': 'Retry' },
  'common.save': { 'fa-IR': 'ذخیره', 'en-US': 'Save' },
  'common.cancel': { 'fa-IR': 'انصراف', 'en-US': 'Cancel' },
  'common.delete': { 'fa-IR': 'حذف', 'en-US': 'Delete' },
  'common.edit': { 'fa-IR': 'ویرایش', 'en-US': 'Edit' },
  'common.view': { 'fa-IR': 'مشاهده', 'en-US': 'View' },
  'common.export': { 'fa-IR': 'خروجی', 'en-US': 'Export' },
  'common.print': { 'fa-IR': 'چاپ', 'en-US': 'Print' },
  'common.refresh': { 'fa-IR': 'به‌روزرسانی', 'en-US': 'Refresh' },
  'common.filter': { 'fa-IR': 'فیلتر', 'en-US': 'Filter' },
  'common.sort': { 'fa-IR': 'مرتب‌سازی', 'en-US': 'Sort' },
  'common.status': { 'fa-IR': 'وضعیت', 'en-US': 'Status' },
  'common.actions': { 'fa-IR': 'عملیات', 'en-US': 'Actions' },
  'common.confirm': { 'fa-IR': 'تایید', 'en-US': 'Confirm' },
  'common.back': { 'fa-IR': 'بازگشت', 'en-US': 'Back' },
  'common.next': { 'fa-IR': 'بعدی', 'en-US': 'Next' },
  'common.prev': { 'fa-IR': 'قبلی', 'en-US': 'Previous' },
  'common.total': { 'fa-IR': 'مجموع', 'en-US': 'Total' },
  'common.active': { 'fa-IR': 'فعال', 'en-US': 'Active' },
  'common.inactive': { 'fa-IR': 'غیرفعال', 'en-US': 'Inactive' },
  'theme.light': { 'fa-IR': 'روشن', 'en-US': 'Light' },
  'theme.dark': { 'fa-IR': 'تاریک', 'en-US': 'Dark' },
  'alert.critical': { 'fa-IR': 'بحرانی', 'en-US': 'Critical' },
  'alert.warning': { 'fa-IR': 'هشدار', 'en-US': 'Warning' },
  'alert.info': { 'fa-IR': 'اطلاع', 'en-US': 'Info' },
}

export function useLocale() {
  function t(key: string): string {
    return translations[key]?.[currentLocale.value] ?? key
  }

  function setLocale(locale: Locale): void {
    currentLocale.value = locale
    document.documentElement.dir = locale === 'fa-IR' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
    localStorage.setItem('bijan-locale', locale)
  }

  function initLocale(): void {
    const stored = localStorage.getItem('bijan-locale') as Locale | null
    setLocale(stored ?? 'fa-IR')
  }

  return {
    currentLocale,
    t,
    setLocale,
    initLocale,
  }
}
