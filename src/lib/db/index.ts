import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '$lib/types';

export type Client = SupabaseClient<Database>;
type Result<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

export const getAppartmentsQuery = (client: Client) =>
  client.from('house').select('*, real_state_agency(*), tags:tag(*)');
export const getAppartments = async (client: Client) => (await getAppartmentsQuery(client)).data;
export type Appartments = Result<typeof getAppartments>;
export type Appartment = NonNullable<Appartments>[number];

export type AppartmentData = {
  name: string;
  place: string;
  price: number;
  website: string;
  m2: number;
  real_state_agency_id: number;
  rating: [m: number, j: number];
  // tags: number[];
};
export const createAppartment = async (client: Client, { rating, ...data }: AppartmentData) =>
  (
    await client
      .from('house')
      .insert([
        {
          ...data,
          m_rating: rating[0],
          j_rating: rating[1]
        }
      ])
      .select()
      .throwOnError()
  ).data;

export const getAgenciesQuery = (client: Client) => client.from('real_state_agency').select('*');
export const getAgencies = async (client: Client) => (await getAgenciesQuery(client)).data;
export type Agencies = Result<typeof getAgencies>;
export type Agency = NonNullable<Agencies>[number];
