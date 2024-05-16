import { Keys } from '$lib/config';
import { getAppartments } from '$lib/db';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient, supabaseClient } = await parent();

  queryClient.prefetchQuery({
    queryKey: Keys.Appartments,
    queryFn: () => getAppartments(supabaseClient)
  });
};
