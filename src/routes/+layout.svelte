<script lang="ts">
    import '../global.css';

    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
    import { PlusIcon } from 'lucide-svelte';
    import type { Snippet } from 'svelte';
    import { sineInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';

    import { TextIconButton } from '$lib/components';
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

<svelte:head>
    <title>🏡 Our future home</title>
</svelte:head>

{#snippet nav()}
    <header class="flex min-h-24 w-full flex-col items-center bg-primary p-6 text-white transition">
        {#if !hideBar}
            <h1
                class="pb-4 text-2xl font-bold uppercase"
                transition:slide={{ axis: 'y', duration: 200, easing: sineInOut }}
            >
                Our future home
            </h1>
        {/if}
        <input class="h-12 w-full rounded-full bg-white px-5" placeholder="Search an appartment" />
    </header>
{/snippet}

{#snippet add_button()}
    <div class="fixed bottom-4 left-0 right-0">
        <TextIconButton class="mx-auto" Icon={PlusIcon} color="primary">
            New appartment
        </TextIconButton>
    </div>
{/snippet}

<QueryClientProvider client={data.queryClient}>
    {@render nav()}
    <main
        class=" overflow-y-auto"
        class:h-[calc(100dvh_-_144px)]={!hideBar}
        class:h-[calc(100dvh_-_96px)]={hideBar}
        onscroll={handleOnScroll}
    >
        {@render add_button()}
        {@render children()}
    </main>
    <SvelteQueryDevtools buttonPosition="top-right" />
</QueryClientProvider>
