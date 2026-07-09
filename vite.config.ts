import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/health-card.ts',
      formats: ['es'],
      fileName: () => 'health-card.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
