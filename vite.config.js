import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // In dev, proxy /api → your local backend so you don't hit CORS
      "/api": {
        target: "http://localhost:7777",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    // Generate source maps for production debugging (optional — remove if you want smaller builds)
    sourcemap: false,
    // Chunk size warning threshold (default 500kb is often hit with redux + socket.io)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split large vendors into separate chunks for better caching
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          socket: ["socket.io-client"],
        },
      },
    },
  },
});