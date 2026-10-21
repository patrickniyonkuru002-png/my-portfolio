import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
      hostname: 'https://my-portfolio-fawn-seven-91.vercel.app',
      // This tells the plugin to generate the sitemap for your homepage
      dynamicRoutes: ['/'] 
    })
  ],
})