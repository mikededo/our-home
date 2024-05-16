<script lang="ts">
    import '../global.css';

    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
    import type { Snippet } from 'svelte';

    import { setSupabaseClient } from '$lib/context';

    import type { LayoutData } from './$types';

    type Props = { children: Snippet; data: LayoutData };
    let { children, data }: Props = $props();

    // Set the supbase client so that it can be used anywhere in the app
    setSupabaseClient(data.supabaseClient);
</script>

<svelte:head>
    <title>🏡 Our future home</title>
</svelte:head>

<QueryClientProvider client={data.queryClient}>
    {@render children()}
    <SvelteQueryDevtools buttonPosition="top-right" />
</QueryClientProvider>
