const baseConfig = require('@camplog/config/tailwind/base')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/modules/wiki/src/**/*.{ts,tsx}',
    '../../packages/modules/forum/src/**/*.{ts,tsx}',
    '../../packages/modules/bug-tracker/src/**/*.{ts,tsx}',
  ],
}
