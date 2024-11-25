import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["slate-dom"],
    include: ["slate", "slate-react"],
  },
  build: {
    commonjsOptions: {
      include: [/slate-dom/, /node_modules/],
    },
  },
  resolve: {
    alias: {
      "slate-dom": "slate",
    },
  },
});
