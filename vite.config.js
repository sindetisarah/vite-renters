import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import svgr from "@svgr/rollup";
import jsconfigPaths from "vite-jsconfig-paths";
import legacy from "@vitejs/plugin-legacy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to "" to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  const PORT = env.VITE_PORT || 3001;

  return {
    plugins: [
      react(),
      jsconfigPaths(),
      svgr(),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".js", ".ts", ".tsx", ".jsx"],
    },
    server: {
      port: PORT,
      watch: {
        usePolling: true,
      },
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true,
      cors: true,
    },
    optimizeDeps: {
      include: ["@rematch/core", "@rematch/loading", "redux-thunk"],
    },
  };
});
