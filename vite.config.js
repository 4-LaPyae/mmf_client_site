import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        ViteImagemin({
            gifsicle: { optimizationLevel: 3, interlaced: false, colors: 10 },
            optipng: { optimizationLevel: 5 },
            svgo: {},
            webp: { quality: 75 },
        }),
    ],
    server: {
        host: '0.0.0.0', // Bind to all network interfaces
        port: 3000,
      },
});
