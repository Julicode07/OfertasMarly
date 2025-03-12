import react from "@vitejs/plugin-react-swc";
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import ViteImagemin from 'vite-plugin-imagemin'
export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
    react(),
    ViteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      svgo: { plugins: [{ removeViewBox: false }] },
    }),
  ],
  optimizeDeps: {
    exclude: ["@nextui-org/react"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  ssr: {
    noExternal: ["@nextui-org/react"],
  },
})