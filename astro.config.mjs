import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hyprlane.qd.je',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
