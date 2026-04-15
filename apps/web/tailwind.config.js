const baseConfig = require('@camplog/config/tailwind/base')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    './src/**/*.{ts,tsx}',
    // Escaneia os pacotes para gerar as classes usadas nos componentes importados
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/modules/wiki/src/**/*.{ts,tsx}',
    '../../packages/modules/forum/src/**/*.{ts,tsx}',
  ],
}
