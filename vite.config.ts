import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/geocode': {
        target: 'https://geocoding.geo.census.gov/geocoder',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/geocode/, ''),
      },
      '/api/weather': {
        target: 'https://api.weather.gov',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/weather/, ''),
        headers: { 'User-Agent': 'weather-demo (dev@example.com)' },
      },
    },
  },
})
