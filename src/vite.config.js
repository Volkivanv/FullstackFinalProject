import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',           // Vite слушает внутри контейнера
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'localhost',       // 🔥 Ключевая строка: браузер будет использовать localhost
      port: 5173,
      clientPort: 5173,        // Проброшенный порт
    },
  },
  clearScreen: false,
});
