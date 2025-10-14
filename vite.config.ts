import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';
// import { resolve } from 'path';

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      util: "util",
    },
  },

  // Server configuration for development with file watching
  server: {
    host: "0.0.0.0", // Listen on all addresses
    port: 8080,
    strictPort: true, // Exit if port is already in use
    // Proxy configuration for development
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true,
      interval: 1000, // Poll every second
      atomic: 500,        // Atomic save detection
      alwaysStat: true,   // Always get file stats
      useFsEvents: false, // Disable native events      
    },
  },

  // Build configuration
  build: {
    // 更改输出目录名称
    outDir: "build", // 可以改为任何你喜欢的名称
    sourcemap: !isProduction, // 生产环境禁用 source map
    minify: "esbuild", // 使用 esbuild 进行压缩
    chunkSizeWarningLimit: 1000, // 提高块大小警告限制

    // 配合移除 console.log
    // rollupOptions: {
    //   plugins: [
    //     {
    //       name: "remove-console",
    //       transform(code) {
    //         if (isProduction) {
    //           return code.replace(/console\.log\(.*?\);?/g, "");
    //         }
    //         return code;
    //       },
    //     },
    //   ],
    // },
  },

  esbuild: {
    pure: isProduction ? ["console.log", "console.debug", "console.info"] : [],
    legalComments: isProduction ? "none" : undefined,
    minifyIdentifiers: isProduction,
    minifySyntax: isProduction,
    minifyWhitespace: isProduction,
    target: "es2020",
  },

  // Add preview configuration
  preview: {
    host: "0.0.0.0", // Listen on all addresses
    port: 3000, // change the preview server port to 8080
    open: true, // automatically open the browser when starting the preview
  },

  optimizeDeps: {
    include: ["crypto-browserify", "stream-browserify", "util"],
    esbuildOptions: {
      define: {
        global: "globalThis", // Browser compatibility
      },
    },
  },
});
