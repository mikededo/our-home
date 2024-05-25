export const Keys = {
  Appartments: ['appartments'],
  Agencies: ['agencies']
};

export const QueryKeys = {
  bottomSheet: 'bottom-view',
  // Filters
  priceRange: 'price-range',
  mRating: 'm-rating',
  jRating: 'j-rating',
  realStateAgency: 'real-state-agency'
};
export const QueryParams = {
  bottomSheet: {
    addAppartment: 'add-appartment',
    editAppartment: 'edit-appartment',
    filters: 'filters'
  }
} as const;
type Parametrized = Exclude<
  keyof typeof QueryKeys,
  'priceRange' | 'mRating' | 'jRating' | 'realStateAgency'
>;
export type Params<T extends Parametrized> = keyof (typeof QueryParams)[T];
