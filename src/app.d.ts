import type { createServerClient } from '@supabase/ssr';

import type { Database } from '$lib/types';

export type ColorScheme = 'light' | 'dark';

declare global {
  namespace App {
    interface Locals {
      supabase: ReturnType<typeof createServerClient<Database>>;
      auth: {
        isAuthenticated: boolean;
        onAuthenticate: () => void;
      };
    }

    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
