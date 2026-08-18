import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/KarismeStore-/",
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_HOST || 'http://backend:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
