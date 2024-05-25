import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { QueryKeys } from '$lib/config';

export const PRICE_RANGE_MIN = 0;
export const PRICE_RANGE_MAX = 1_000_000;
export const PRICE_RANGE_STEP = 50_000;

type Filters = Exclude<keyof typeof QueryKeys, 'bottomSheet'>;

export const apply = (filter: Filters, value: string) => {
  const params = new URLSearchParams(get(page).url.searchParams);
  params.set(QueryKeys[filter], value);
  goto(`?${params.toString()}`);
};

export const filters = (params: URLSearchParams) => {
  const priceRange = params.get(QueryKeys.priceRange);
  const realStateAgency = params.get(QueryKeys.realStateAgency);
  const mRating = params.get(QueryKeys.mRating);
  const jRating = params.get(QueryKeys.jRating);

  const result = {
    priceRange: [PRICE_RANGE_MIN, PRICE_RANGE_MAX],
    realStateAgency,
    mRating: mRating ? +mRating : 0,
    jRating: jRating ? +jRating : 0
  };

  if (priceRange) {
    const values = priceRange.split('_');
    result.priceRange = [+values[0], +values[1]];
  }

  return result;
};
