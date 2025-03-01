
import { relative, resolve } from 'path';
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import {defineConfig, type Plugin} from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";

export function packagesWatcherPlugin(options: Record<string, any> = {}): Plugin {
  const { monorepoRoot = process.cwd() } = options;
  const themesPath = resolve(monorepoRoot,'../../' ,'packages');
  
  return {
    name: 'vite-plugin-theme-watcher',
    apply: 'serve', // Only apply this plugin during development
    
    config(_, { mode, command }) {
      console.log(`[theme-watcher] Running in ${mode} mode with command: ${command}`);
    },
    
    configureServer(server) {
      console.log(`[packages-watcher] Watching for changes in ${themesPath}`);
      const watcher = server.watcher;
      watcher.add(themesPath);
    },
    
    handleHotUpdate({ file, server }) {
      if (file.startsWith(themesPath)) {
        const relativePath = relative(monorepoRoot, file);
        console.log(`[packages-watcher] Change detected in ${relativePath}`);
        console.log('[packages-watcher] Restarting Vite server...');
        
        
        server.restart();
        
        return [];
      }
    }
  };
}

export default defineConfig({
  server: {
    watch: {
      usePolling: true
    }
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), packagesWatcherPlugin()],
});
