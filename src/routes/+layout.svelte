<script lang="ts">
    import '../global.css';

    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
    import type { Snippet } from 'svelte';

    import { setSupabaseClient } from '$lib/context';

    import type { LayoutData } from './$types';

    type Props = { children: Snippet; data: LayoutData };
    let { children, data }: Props = $props();
    let hideBar = $state(false);

    // Set the supbase client so that it can be used anywhere in the app
    setSupabaseClient(data.supabaseClient);

    const handleOnScroll = (e: Event) => {
        const node = e.currentTarget as HTMLElement;
        hideBar = node.scrollTop > 100;
    };
</script>

{#snippet nav()}
    <header class="flex min-h-24 w-full flex-col items-center bg-primary p-6 text-white transition">
        <h1 class="header text-2xl font-bold uppercase" class:collapsed={hideBar}>
            Our future home
        </h1>
        <input
            class="h-12 w-full rounded-full bg-white px-5 text-black"
            placeholder="Search an appartment"
        />
    </header>
{/snippet}

<svelte:head>
    <title>🏡 Our future home</title>
</svelte:head>

<QueryClientProvider client={data.queryClient}>
    {@render nav()}
    <main
        class=" overflow-y-auto"
        class:h-[calc(100dvh_-_144px)]={!hideBar}
        class:h-[calc(100dvh_-_96px)]={hideBar}
        onscroll={handleOnScroll}
    >
        {@render children()}
    </main>
    <SvelteQueryDevtools buttonPosition="top-right" />
</QueryClientProvider>

<style>
    .header {
        --header-bezier: cubic-bezier(0.25, 0.75, 0.5, 1);

        height: 48px;
        -webkit-transition: height 0.2s var(--header-bezier);
        transition: height 0.2s var(--header-bezier);
    }

    .header.collapsed {
        height: 0px;
        -webkit-transition: height 0.2s var(--header-bezier);
        transition: height 0.2s var(--header-bezier);
    }
</style>
