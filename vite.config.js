import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "node:stream": "stream-browserify",
      stream: "stream-browserify",
    },
  },
  plugins: [nodePolyfills({
     include: [
      '*.js',
      'node_modules/**/*.js', 
      // (1)
      new RegExp('node_modules/.vite/.*js')],
    // (2)
    exclude: ['node_modules/polyfill-nodeglobal.js']
  }), svelte()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
});
