<script lang="ts">
    import '../global.css';

    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
    import { ArrowUp, ListFilterIcon, PlusIcon } from 'lucide-svelte';
    import type { Snippet } from 'svelte';
    import { quadInOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { IconButton, TextIconButton } from '$lib/components';
    import { QueryKeys, QueryParams } from '$lib/config';
    import { setSupabaseClient } from '$lib/context';
    import { scrollMainToTop } from '$lib/dom';

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

    const handleOnClick = () => {
        const params = new URLSearchParams($page.url.searchParams);
        params.set(QueryKeys.bottomSheet, QueryParams.bottomSheet.addAppartment);
        goto(`?${params.toString()}`);
    };
</script>

{#snippet nav()}
    <header class="flex min-h-24 w-full flex-col items-center bg-primary p-6 text-white transition">
        <div class="container">
            <h1
                class="header overflow-hidden text-2xl font-bold uppercase"
                class:collapsed={hideBar}
            >
                Our future home
            </h1>
            <input
                class="h-12 w-full rounded-full bg-white px-5 text-black"
                placeholder="Search an appartment"
            />
        </div>
    </header>
{/snippet}

{#snippet add_button()}
    <div class="fixed bottom-4 left-0 right-0 flex items-center justify-center gap-1">
        {#if hideBar}
            <div transition:fly={{ x: 50, duration: 200, easing: quadInOut }}>
                <IconButton
                    Icon={ListFilterIcon}
                    onclick={handleOnClick}
                    color="secondary"
                    size="small"
                />
            </div>
        {/if}
        <TextIconButton Icon={PlusIcon} color="primary" onclick={handleOnClick} class="z-10">
            New appartment
        </TextIconButton>
        {#if hideBar}
            <div transition:fly={{ x: -50, duration: 200, easing: quadInOut }}>
                <IconButton
                    Icon={ArrowUp}
                    onclick={scrollMainToTop}
                    color="secondary"
                    size="small"
                />
            </div>
        {/if}
    </div>
{/snippet}

<svelte:head>
    <title>🏡 Our future home</title>
</svelte:head>

<QueryClientProvider client={data.queryClient}>
    {@render nav()}
    <main
        id="main-content"
        class="overflow-y-auto"
        class:h-[calc(100dvh_-_144px)]={!hideBar}
        class:h-[calc(100dvh_-_96px)]={hideBar}
        onscroll={handleOnScroll}
    >
        {@render children()}
        {@render add_button()}
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
