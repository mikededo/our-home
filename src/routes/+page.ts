import { Keys } from '$lib/config';
import { getAgencies, getAppartments } from '$lib/db';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient, supabaseClient } = await parent();

  queryClient.prefetchQuery({
    queryKey: Keys.Appartments,
    queryFn: () => getAppartments(supabaseClient)
  });
  queryClient.prefetchQuery({
    queryKey: Keys.Agencies,
    queryFn: () => getAgencies(supabaseClient)
  });
};
