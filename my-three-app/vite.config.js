// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // ensures relative paths work even in nested folders
  server: {
    port: 5173,
  },
});
