import angular from "@nitedani/vite-plugin-angular";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [angular()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["import", "if-function"],
      },
    },
  },
  server: {
    port: 3000,
  },
});
