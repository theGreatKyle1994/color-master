import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react-swc";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  preview: {
    port: 5000,
  },
});
