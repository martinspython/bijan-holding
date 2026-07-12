<div dir="rtl">

# بیژن هولدینگ - سامانهٔ دیجیتال یکپارچه

[![CI](https://github.com/bijan-holding/digital-suite/actions/workflows/ci.yml/badge.svg)](https://github.com/bijan-holding/digital-suite/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Vue](https://img.shields.io/badge/Vue-3.5-brightgreen)](https://vuejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15-orange)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.3-black)](https://turbo.build/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

![Bijan Holding](https://img.shields.io/badge/BIJAN-HOLDING-C41E3A?style=flat-square)

سه سامانهٔ تحت وب برای مدیریت یکپارچهٔ ناوگان، بازرگانی و لجستیک بیژن هولدینگ.

---

## 📋 نمای کلی

| سامانه | پورت | دامنه | توضیح |
|--------|------|-------|-------|
| **کنترل پنل** (ناوگان) | 3000 | fleet.bijan.ir | مدیریت ناوگان با نقشهٔ لحظه‌ای MapLibre |
| **اپلیکیشن راننده** (PWA) | 3001 | driver.bijan.ir | اپلیکیشن موبایل رانندگان با پشتیبانی آفلاین |
| **سکوی بازرگانی** | 3002 | commercial.bijan.ir | تدارکات، قراردادها، مذاکره و زنجیرهٔ تأمین |

## 🏗 معماری

```
bijan-holding/
├── apps/
│   ├── control-panel/    # Vue 3 + MapLibre GL (ناوگان)
│   ├── driver-app/       # Vue 3 + PWA (رانندگان)
│   └── commercial/       # Vue 3 + ECharts + MapLibre (بازرگانی)
├── packages/
│   ├── ui/               # ۱۷ کامپوننت مشترک
│   ├── types/            # ۳۰+ نوع تایپ‌اسکریپت
│   └── config/           # ESLint, Tailwind, tsconfig
├── turbo.json            # Turborepo pipeline
└── pnpm-workspace.yaml   # Monorepo workspace
```

### استک فناوری

| لایه | فناوری |
|------|--------|
| چارچوب | Vue 3 + Composition API + `<script setup lang="ts">` |
| استایل | Tailwind CSS + CSS Variables + Dark Mode |
| حالت | RTL (فارسی) با فونت وزیرمتن |
| نقشه | MapLibre GL JS + OpenStreetMap (رایگان) |
| چارت | ECharts + vue-echarts |
| وضعیت | Pinia (۶ store در کنترل پنل) |
| مسیریاب | Vue Router 4 + lazy loading |
| PWA | vite-plugin-pwa (اپ راننده) |
| مونورپو | Turborepo + pnpm workspaces |
| CI/CD | GitHub Actions + Vercel |

## 🚀 شروع سریع

### پیش‌نیازها

- Node.js ≥ 20
- pnpm ≥ 9 (`corepack enable pnpm && pnpm --version`)

### نصب و اجرا

```bash
git clone https://github.com/bijan-holding/digital-suite.git
cd bijan-holding

pnpm install
pnpm dev
```

سپس در مرورگر باز کنید:

- **کنترل پنل**: http://localhost:3000 (ورود: `admin/admin`)
- **اپ راننده**: http://localhost:3001 (ورود: `driver/driver`)
- **سکوی بازرگانی**: http://localhost:3002 (ورود: `commercial/commercial`)

### ساخت برای تولید

```bash
pnpm build
```

## 📦 بسته‌های اشتراکی

### `@bijan/ui` — ۱۷ کامپوننت

BijanButton, BijanCard, BijanKpiCard, BijanDataTable, BijanSidebar, BijanHeader, BijanModal, BijanTabs, BijanAlert, BijanNotification, BijanTimeline, BijanStatusDot, BijanThemeToggle, BijanSearchInput, BijanSkeleton, BijanBadge, BijanDropdown

به همراه ۵ composable: `useTheme`, `useLocale`, `useNotifications`, `useBreakpoints`, `useDataFetch`

### `@bijan/types` — ۳۰+ اینترفیس

User, KpiMetric, ProductionLine, FleetVehicle, SalesData, Employee, FestivalStore, Product, Contract, Supplier, PurchaseOrder, و ...

### `@bijan/config` — تنظیمات مشترک

- ESLint با `eslint-plugin-vuejs-accessibility` (WCAG 2.1 AA)
- Tailwind با رنگ‌های برند (`#C41E3A`, `#2D5016`, `#FF6B35`, `#D4AF37`)
- tsconfig برای Vue 3 Strict Mode

## 🗺 ویژگی‌های کلیدی

### کنترل پنل (ناوگان)
- **نقشه زنده**: ۳۰ خودرو با حرکت شبیه‌سازی‌شده در ۶ مسیر ایران
- **نمایش دوگانه**: نقشه / لیست با جستجو
- **جزئیات راننده**: سرعت، مسیر، پیشرفت، ETA
- **داشبورد**: ۶ KPI با چارت‌های ECharts
- **۷ صفحه**: داشبورد، تولید، ناوگان، فروش، منابع انسانی، فروشگاه‌ها، گزارشات

### اپلیکیشن راننده (PWA)
- **آفلاین‌فرست**: سرویس ورکر + کش استراتژی
- **مسیریابی**: نمایش مسیر با مبدأ و مقصد
- **تحویل‌ها**: لیست تحویل‌ها با وضعیت
- **حالت تاریک**: پشتیبانی کامل

### سکوی بازرگانی
- **داشبورد تدارکات**: ۶ KPI، چارت دونات، نمودار میله‌ای
- **تأمین‌کنندگان**: ۸ تأمین‌کننده با امتیاز ریسک و کیفیت
- **قراردادها**: ۶ قرارداد با مراحل کلیدی و پرداخت‌ها
- **سفارشات خرید**: گردش کار تأیید
- **تحلیل داده**: روند هزینه ماهانه، توزیع دسته‌بندی
- **زنجیره تأمین**: نقشه MapLibre با ۱۲ گره و ۸ مسیر
- **دستیار مذاکره**: تحلیل‌های هوشمند و پیشنهادات

## 🤝 مشارکت

لطفاً [CONTRIBUTING.md](.github/CONTRIBUTING.md) را مطالعه کنید.

### Commit Convention

ما از [Conventional Commits](https://www.conventionalcommits.org/) استفاده می‌کنیم:

```
feat(control-panel): add fleet map markers
fix(driver-app): offline route sync
chore(deps): upgrade vue to 3.5
```

### Branch Strategy

- `main` — آمادهٔ انتشار
- `develop` — یکپارچه‌سازی روزانه
- `feat/*` — ویژگی‌های جدید
- `fix/*` — رفع باگ
- `release/*` — آماده‌سازی انتشار

## 🔒 امنیت

- عدم ذخیرهٔ رمز عبور در کد
- تزریق امنیتی از طریق CSP, HSTS در Vercel
- اسکن خودکار با gitleaks در CI
- بازبینی کد اجباری (CODEOWNERS)

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است — فایل [LICENSE](LICENSE) را ببینید.

---

**توسعه داده شده با ❤️ برای بیژن هولدینگ**

</div>
