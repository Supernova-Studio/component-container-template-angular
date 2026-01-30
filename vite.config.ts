import { defineConfig } from "vite";
import { angular } from "@nitedani/vite-plugin-angular/plugin";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [angular()],
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
