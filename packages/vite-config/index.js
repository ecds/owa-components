import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

/**
 * Base Vite config for WordPress shortcode components.
 * Produces stable filenames (no content hash) so wp_enqueue_script paths never change.
 *
 * @param {object} [options]
 * @param {import('vite').Plugin[]} [options.plugins] - Extra plugins (Tailwind, Cesium, etc). React is included by default.
 * @param {boolean} [options.reactless] - Set true to omit the React plugin (e.g. Cesium apps).
 * @param {string} [options.base] - WordPress asset base path. Overridden by VITE_WP_BASE env var.
 * @param {string} [options.target] - Vite build target. Defaults to 'es2022' to support top-level await.
 * @returns {import('vite').UserConfig}
 */
export function createWordPressConfig(options = {}) {
  const { plugins: extraPlugins = [], reactless = false, base, target = "es2022" } = options;
  const resolvedBase = base ?? process.env.VITE_WP_BASE ?? "/";

  return defineConfig({
    base: resolvedBase,
    plugins: [...(reactless ? [] : [react()]), ...extraPlugins],
    server: { hmr: true },
    build: {
      target,
      rollupOptions: {
        output: {
          entryFileNames: "index.js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
    },
  });
}
