import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Un único archivo HTML con todo dentro (código, sprites, sonidos y fuente):
// así el juego no hace ninguna petición a servidores de terceros.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { assetsInlineLimit: 100_000_000, cssCodeSplit: false, target: 'es2020' },
});
