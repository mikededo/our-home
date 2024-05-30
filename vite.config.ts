import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(async () => ({
  plugins: [await sveltekit()],
  envPrefix: 'OUR_HOME_'
}));
