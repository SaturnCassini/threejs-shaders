import { defineConfig } from 'vite'
import type { ConfigEnv } from 'vite';
import { resolve } from 'path'
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default async function (env: ConfigEnv) {

  const isProduction = env.mode === 'production';

  return defineConfig({

    envDir: './',

    base: '/',

    resolve: {

      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: [
        { find: /^@model\//, replacement: `${resolve(__dirname, "./src/model/")}/` },
        { find: /^@components\//, replacement: `${resolve(__dirname, "./src/components/")}/` },
        { find: /^@\//, replacement: `${resolve(__dirname, './src/')}/` },

      ]
    },

    build: {

      /// Build output to static server directory.
      outDir: resolve(__dirname, 'dist'),

      commonjsOptions: {
      },
      rollupOptions: {

        plugins: [
        ],
        output: {
          manualChunks(id: any) {
            if (id.includes("node_modules/") && !id.endsWith(".css")) {
              return "libs";
            }
          },
        },
      }
    },

    plugins: [

      createHtmlPlugin({
        minify: isProduction,
        template: './index.html'
        , inject: {
          data: {
          },
        },
      }),


    ],

    optimizeDeps: {


    },

    server: {
      port: 3007,
      cors: true,
      https: false,
      hmr: {
        host: 'localhost',
      },
      fs: {
        strict: false
      },
      watch: {
        ignored: [
        ],
      },
    },
  });
}