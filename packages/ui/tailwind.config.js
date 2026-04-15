const baseConfig = require('@camplog/config/tailwind/base')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ['./src/**/*.{ts,tsx}'],
}
