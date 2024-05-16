import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '$lib/types';

export type Client = SupabaseClient<Database>;
// type Result<T extends (...args: any) => any> = QueryData<ReturnType<T>>;
