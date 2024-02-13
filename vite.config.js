import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'
import liveReload from 'vite-plugin-live-reload'

export default defineConfig({
  plugins: [
    vue(),
    liveReload(`${__dirname}/**/*\.php`),
    copy({
      targets: [{ src: 'src/assets/*', dest: 'assets/' }]
    })
  ],

  build: {
    manifest: true,
    outDir: 'assets',
    assetsDir: 'assetsDIR',
    emptyOutDir: true,

    // Rollup options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.ts')
      },
      output: {
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? '')) {
            return 'css/[name][extname]'
          }
          return '[name][extname]'
        }
      }
    }
  },

  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },

  server: {
    port: 8880,
    strictPort: true,
    hmr: {
      port: 8880,
      host: 'localhost',
      protocol: 'ws'
    }
  }
})
