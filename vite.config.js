import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import jsconfigPaths from "vite-jsconfig-paths";

// https://vitejs.dev/config/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to "" to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  const PORT = env.VITE_PORT || 3000;
  return {
    plugins: [
      react(),
      jsconfigPaths(),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: PORT,
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      cors: true,
    },
  };
});
