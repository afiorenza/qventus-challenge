import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), dts(), libInjectCss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: '@agustin.fiorenza/qventus-challenge',
      fileName: format => `index.${format === 'es' ? 'es' : 'cjs'}.js`,
      formats: ['es', 'cjs'],
      cssFileName: 'index',
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
