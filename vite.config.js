import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  optimizeDeps: {
    include: ['lucide-vue-next', '@heroicons/vue/24/outline', '@heroicons/vue/24/solid'],
    force: true
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false
    }
  }
})