import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          compressor: path.resolve(__dirname, 'image-compressor.html'),
          resizer: path.resolve(__dirname, 'image-resizer.html'),
          crop: path.resolve(__dirname, 'image-crop.html'),
          jpgToPng: path.resolve(__dirname, 'jpg-to-png.html'),
          pngToJpg: path.resolve(__dirname, 'png-to-jpg.html'),
          webp: path.resolve(__dirname, 'webp-converter.html'),
          pdf: path.resolve(__dirname, 'image-to-pdf.html'),
          about: path.resolve(__dirname, 'about.html'),
          privacy: path.resolve(__dirname, 'privacy-policy.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
