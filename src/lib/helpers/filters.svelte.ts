import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { QueryKeys } from '$lib/config';
import { type AppartmentFilters, DEFAULT_NONE_AGENCY_ID } from '$lib/db';

export const PRICE_RANGE_MIN = 0;
export const PRICE_RANGE_MAX = 1_000_000;
export const PRICE_RANGE_STEP = 50_000;

type Filters = Exclude<keyof typeof QueryKeys, 'bottomSheet'>;

const deleteOrSet = (
  params: URLSearchParams,
  key: string,
  value: string | number,
  set: boolean
) => {
  // Clone to avoid side-effects
  const result = new URLSearchParams(params);
  if (set) {
    result.set(key, `${value}`);
  } else {
    result.delete(key);
  }
  return result;
};

export const apply = (filter: Filters, value: string) => {
  const params = new URLSearchParams(get(page).url.searchParams);
  params.set(QueryKeys[filter], value);
  goto(`?${params.toString()}`, { replaceState: false });
};

export const reset = (params: URLSearchParams, state: Required<AppartmentFilters>) => {
  let result = new URLSearchParams(params);

  result = deleteOrSet(
    result,
    QueryKeys.priceRange,
    `${PRICE_RANGE_MIN}_${PRICE_RANGE_MAX}`,
    state.priceRange[0] === PRICE_RANGE_MIN && state.priceRange[1] === PRICE_RANGE_MAX
  );
  result = deleteOrSet(
    result,
    QueryKeys.realStateAgency,
    state.realStateAgency,
    state.realStateAgency === DEFAULT_NONE_AGENCY_ID
  );
  result = deleteOrSet(result, QueryKeys.mRating, state.mRating, state.mRating > 0);
  result = deleteOrSet(result, QueryKeys.jRating, state.jRating, state.jRating > 0);

  goto(`?${result.toString()}`, { replaceState: false });
};

export const remove = (filter: Filters) => {
  const params = new URLSearchParams(get(page).url.searchParams);
  params.delete(QueryKeys[filter]);
  goto(`?${params.toString()}`, { replaceState: false });
};

export const filters = (params: URLSearchParams): Required<AppartmentFilters> => {
  const priceRange = params.get(QueryKeys.priceRange);
  const realStateAgency = params.get(QueryKeys.realStateAgency);
  const mRating = params.get(QueryKeys.mRating);
  const jRating = params.get(QueryKeys.jRating);

  const result = {
    priceRange: [PRICE_RANGE_MIN, PRICE_RANGE_MAX] as [number, number],
    realStateAgency: realStateAgency ? +realStateAgency : DEFAULT_NONE_AGENCY_ID,
    mRating: mRating ? +mRating : 0,
    jRating: jRating ? +jRating : 0
  };

  if (priceRange) {
    const values = priceRange.split('_');
    result.priceRange = [+values[0], +values[1]];
  }

  return result;
};

export const count = (params: URLSearchParams) => {
  const { priceRange, realStateAgency, mRating, jRating } = filters(params);

  return (
    (priceRange[0] === PRICE_RANGE_MIN && priceRange[1] === PRICE_RANGE_MAX ? 0 : 1) +
    (realStateAgency && realStateAgency !== DEFAULT_NONE_AGENCY_ID ? 1 : 0) +
    (mRating > 0 ? 1 : 0) +
    (jRating > 0 ? 1 : 0)
  );
};
