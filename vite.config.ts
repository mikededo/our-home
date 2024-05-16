import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  envPrefix: 'OUR_HOME_',
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
