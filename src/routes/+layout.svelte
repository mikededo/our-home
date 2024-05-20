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
    import { initHeader, setSupabaseClient } from '$lib/context';
    import { scrollMainToTop } from '$lib/dom';
    import { SearchInput, Tabs } from '$lib/domain';

    import type { LayoutData } from './$types';

    type Props = { children: Snippet; data: LayoutData };
    let { children, data }: Props = $props();
    let hideBar = $state(false);

    // Set the supbase client so that it can be used anywhere in the app
    setSupabaseClient(data.supabaseClient);
    let headerContext = initHeader();

    const handleOnScroll = (e: Event) => {
        const node = e.currentTarget as HTMLElement;

        if (node.scrollTop > 100 && !headerContext.condensed) {
            hideBar = true;
        } else if (node.scrollTop <= 100 && headerContext.condensed) {
            hideBar = false;
        }
    };

    const handleOnClick = () => {
        const params = new URLSearchParams($page.url.searchParams);
        params.set(QueryKeys.bottomSheet, QueryParams.bottomSheet.addAppartment);
        goto(`?${params.toString()}`);
    };
</script>

{#snippet header()}
    <header
        class="flex min-h-24 w-full flex-col items-center bg-primary p-6 pb-4 text-white transition"
    >
        <div class="container">
            <h1
                class="header overflow-hidden text-2xl font-bold uppercase"
                class:condensed={headerContext.condensed}
            >
                Our future home
            </h1>
            <SearchInput />
        </div>
    </header>
{/snippet}

{#snippet add_button()}
    <div class="fixed bottom-4 left-0 right-0 flex items-center justify-center gap-1">
        {#if headerContext.condensed}
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
    {@render header()}
    <main
        id="main-content"
        class="overflow-y-auto px-6 pt-4 transition"
        class:h-main-sm={!headerContext.condensed}
        class:h-main-full={headerContext.condensed}
        onscroll={handleOnScroll}
    >
        <Tabs />
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

    .header.condensed {
        height: 0px;
        -webkit-transition: height 0.2s var(--header-bezier);
        transition: height 0.2s var(--header-bezier);
    }
</style>
