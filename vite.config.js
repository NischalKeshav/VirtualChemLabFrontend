import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "b480115e-430c-4c7f-8dd3-12a4b7c9ad8e-00-1iogr66qqje0s.pike.replit.dev",
    ],
    hmr: {
      clientPort: 443,
      protocol: "wss",
    },
    proxy: {
      "^/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
