import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const serverPort = process.env.PORT || 3023;
console.log(`api server should run on port ${serverPort}`);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api": `http://localhost:${serverPort}`,
      "/api": `https://acme-employees-xixj.onrender.com:${serverPort}`,
    },
  },
});

/*  https://acme-employees-xixj.onrender.com/api/employees  */
