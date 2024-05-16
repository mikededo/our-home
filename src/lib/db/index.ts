import type { QueryData, SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '$lib/types';

export type Client = SupabaseClient<Database>;
type Result<T extends (...args: any) => any> = QueryData<ReturnType<T>>;

export const getAppartmentsQuery = (client: Client) =>
  client.from('house').select('*, real_state_agency(*), tags:tag(*)');
export const getAppartments = async (client: Client) => (await getAppartmentsQuery(client)).data;
export type Appartments = Result<typeof getAppartments>;
export type Apparment = Appartments[number];
