import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/sass/abstract/_variables.scss";
        @import "./src/sass/abstract/_mixins.scss";
        `,
      },
    },
  },
})
