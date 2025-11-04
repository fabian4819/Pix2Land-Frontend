import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        customer: new URL("./src/Customer/main.jsx", import.meta.url).pathname,
        admin: new URL("./src/Admin/main.jsx", import.meta.url).pathname,
      },
    },
  },
});
