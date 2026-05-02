import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/webpage/', // Измени на имя твоего репозитория на GitHub
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
