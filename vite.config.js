import react from "@vitejs/plugin-react-swc";
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
    react(),
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