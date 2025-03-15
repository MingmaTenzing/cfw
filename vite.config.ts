import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/fuelwatch': {
        target: 'https://www.fuelwatch.wa.gov.au/api',
        changeOrigin: true,
        secure: true,
        ws: false,
        rewrite: (path) => path.replace(/^\/fuelwatch/, ''),
      },
      '/fuelwatchxml': {
        target: 'https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Product=5&Region=28',
        changeOrigin: true,
        secure: true,
        ws: false,
        rewrite: (path) => path.replace(/^\/fuelwatchxml/, ''),
      },
    },
  },
})
