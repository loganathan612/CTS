import { defineConfig, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        // Support Windows and Unix path separators
        if (!id.match(/src[\\/].*\.js$/)) return null;

        const result = await transformWithOxc(code, id, {
          lang: 'jsx',
          jsx: {
            runtime: 'automatic',
          },
        });
        return result ? { code: result.code, map: result.map } : null;
      },
    },
    react(),
  ],
});
