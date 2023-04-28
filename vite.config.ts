import { rmSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'
import path from 'path'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {

  rmSync('dist-electron', { recursive: true, force: true })


  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        "pg-hstore": path.resolve(__dirname, "empty_module"),
        "mock-aws-s3": path.resolve(__dirname, "empty_module"),
        "aws-sdk": path.resolve(__dirname, "empty_module"),
        "nock": path.resolve(__dirname, "empty_module"),
      }
    },

    //uncomment these when build
    
    build: {
      rollupOptions: {
        external: [{sequelize: "require('sequelize')", sqlite3: "require('sqlite3')"}, 'express'], // add this line
      },
    },

    

    plugins: [
      vue(),
      //uncomment blow when build
      viteCommonjs(),
      electron([
        {
          // Main-Process entry file of the Electron App.
          entry: 'electron/main/index.ts',
          onstart(options) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
            } else {
              options.startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        {
          entry: 'electron/preload/index.ts',
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
            // instead of restarting the entire Electron App.
            options.reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        }
      ]),
      // Use Node.js API in the Renderer-process
      renderer(),
    ],


    //uncomment these when build

    optimizeDeps: {
      force: true,
      esbuildOptions: {
        plugins: [
          esbuildCommonjs([{sequelize: "require('sequelize')", sqlite3: "require('sqlite3')"}, 'express']),
        ],
      },
    },

    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
      return {
        host: url.hostname,
        port: +url.port,
      }
    })(),
    clearScreen: false,
  }
})
