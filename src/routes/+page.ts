import { Filters } from '$lib/helpers';

import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => ({
  initialFilters: Filters.filters(url.searchParams)
});
