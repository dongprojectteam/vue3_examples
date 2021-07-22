import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '/@': path.resolve(__dirname, './src'),
      '/@components': path.resolve(__dirname, './src/components'),
      '/@app_modules': path.resolve(__dirname, './src/modules'),
      '/@store': path.resolve(__dirname, './src/store')
    },
    extensions: [".js"]
  },
  plugins: [vue()]
})
