import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react") || id.includes("react-dom") || id.includes("react-router-dom")) {
            return "react";
          }
          if (id.includes("sonner")) {
            return "ui";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
