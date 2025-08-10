// vite.config.js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Changed from "/custom-new-tab/" to "./" for Chrome extension
  plugins: [react()],
});
