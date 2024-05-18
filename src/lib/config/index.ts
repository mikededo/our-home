export const Keys = {
  Appartments: ['appartments']
};

export const QueryKeys = {
  bottomSheet: 'bottom-view'
};
export const QueryParams = {
  bottomSheet: {
    addAppartment: 'add-appartment',
    editAppartment: 'edit-appartment'
  }
} as const;
export type Params<T extends keyof typeof QueryKeys> = keyof (typeof QueryParams)[T];
