import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: '@agustin.fiorenza/qventus-challenge',
      fileName: format => `index.${format === 'es' ? 'es' : 'cjs'}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
    sourcemap: true,
  },
  server: {
    port: 8080,
  },
});
