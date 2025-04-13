// vite.config.js
import { defineConfig } from "vite";
export default {
  server: {
    allowedHosts: ['apeye.tech', 'www.apeye.tech'],
    host: '0.0.0.0',
    port: 5173
  }
}
