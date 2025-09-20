import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:5000',
      '/posts': 'http://localhost:5000',
      '/authors': 'http://localhost:5000',
      '/post': 'http://localhost:5000',
    }
  }
})
