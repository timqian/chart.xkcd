import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  if (mode === 'example') {
    return {
      root: 'examples',
      build: {
        outDir: '../docs-dist',
        emptyOutDir: false,
        rollupOptions: {
          input: path.resolve(__dirname, 'examples/example.html'),
          output: {
            entryFileNames: 'example.js',
          },
        },
      },
    };
  }

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'chartXkcd',
        formats: ['umd', 'es'],
        fileName: (format) => {
          if (format === 'umd') {
            return 'chart.xkcd.min.js';
          }
          return 'index.js';
        },
      },
      outDir: 'dist',
      minify: 'terser',
      terserOptions: {
        compress: {
          passes: 3,
          drop_console: true,
          drop_debugger: true,
          pure_getters: true,
          unsafe: true,
          unsafe_arrows: true,
          unsafe_methods: true,
        },
        mangle: {
          toplevel: true,
          properties: {
            regex: '^_',
          },
        },
        format: {
          comments: false,
        },
      },
      sourcemap: false,
    },
  };
});
