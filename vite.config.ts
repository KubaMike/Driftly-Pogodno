import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Must agree with the router basename in src/main.tsx. A relative base
  // resolves assets against the current URL, so on a nested route such as
  // /trail/<id> (which is served through the 404.html SPA fallback) it would
  // request /trail/assets/... and 404. Deriving the base from the same
  // variable keeps the two in step while still defaulting to './' for local
  // builds, so nothing changes unless the basename is explicitly set.
  base: process.env.VITE_ROUTER_BASENAME || './',
  build: {
    outDir: 'dist'
  }
});