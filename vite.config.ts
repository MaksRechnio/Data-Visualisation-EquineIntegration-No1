import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Listen on all addresses (0.0.0.0)
    open: true, // Automatically open browser
    strictPort: false, // Try next available port if 5173 is taken
  },
  preview: {
    port: 4173,
    host: true,
    open: true,
    strictPort: false,
  },
})
