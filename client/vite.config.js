import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 3000,
    open: true,
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  rules: {
    "react/jsx-uses-vars": "warn",
    "no-unused-vars": "warn",
  },
});
