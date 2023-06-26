import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Pages from 'vite-plugin-pages';
import VuePlugin from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [
    VuePlugin(),

    AutoImport({
      imports: ['vue', 'pinia'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/components/**/*', 'src/store', 'src/hooks', 'src/types'],
      include: [/\.ts?$/, /\.vue\??/],
      vueTemplate: true,
    }),

    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),

    Pages(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use './src/styles/imports.scss' as *;
        `,
      },
    },
  },
});
