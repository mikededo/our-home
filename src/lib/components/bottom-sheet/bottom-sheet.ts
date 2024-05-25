import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { type Params, QueryKeys, QueryParams } from '$lib/config';

export const onOpenBottomSheet = (param: Params<'bottomSheet'>) => () => {
  const params = new URLSearchParams(get(page).url.searchParams);
  params.set(QueryKeys.bottomSheet, QueryParams.bottomSheet[param]);
  goto(`?${params.toString()}`);
};

export const onCloseBottomSheet = () => {
  const params = new URLSearchParams(get(page).url.searchParams);
  params.delete(QueryKeys.bottomSheet);
  goto(`?${params.toString()}`);
};
