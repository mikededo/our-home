import { createBrowserClient } from '@supabase/ssr';
import { QueryClient } from '@tanstack/svelte-query';

import { browser } from '$app/environment';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, depends }) => {
  depends('supabase:auth');

  const supabaseClient = createBrowserClient(
    import.meta.env.OUR_HOME_SUPABASE_URL,
    import.meta.env.OUR_HOME_SUPABASE_KEY,
    { global: { fetch } }
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: 60 * 1000
      }
    }
  });

  return { queryClient, supabaseClient };
};
