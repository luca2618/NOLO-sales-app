import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows external access to the development server
    port: 8080,      // The port you want to use for your dev server
    strictPort: true, // Fail if port 8080 is not available
    hmr: {
      protocol: 'wss', // Use 'wss' for secure connections if your site uses HTTPS
      host: '192.168.1.6', // Your domain name or server's public IP
      port: 443, // Typically 443 for HTTPS
    },
  },
});
