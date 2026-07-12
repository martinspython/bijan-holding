import type { Config } from 'tailwindcss'
import baseConfig from '@bijan/config/tailwind'

export default {
  presets: [baseConfig],
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx}',
    '../../packages/ui/src/**/*.{vue,ts,tsx}',
  ],
} satisfies Config
