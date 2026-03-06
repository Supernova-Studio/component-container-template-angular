import { defineConfig } from "vite";
import angular from "@analogjs/vite-plugin-angular";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [angular()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    allowedHosts: true,
  },
  publicDir: "public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
