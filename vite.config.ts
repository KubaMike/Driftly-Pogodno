import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Must agree with the router basename in src/main.tsx. The base has to be
  // absolute: a relative base ('./') resolves assets against the current URL,
  // so opening a nested route directly (e.g. /trail/<id> from a shared link or
  // QR code, served through the server's SPA fallback) would request
  // /trail/assets/... and 404 — leaving a blank white page, while in-app
  // navigation still worked. Default to '/' (domain root) and let
  // VITE_ROUTER_BASENAME override it for subpath deploys such as GitHub Pages.
  base: process.env.VITE_ROUTER_BASENAME || '/',
  build: {
    outDir: 'dist'
  }
});