<script lang="ts">
    import '../global.css';

    import { QueryClientProvider, createMutation } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
    import { ArrowUp, KeyIcon, ListFilterIcon, PlusIcon } from 'lucide-svelte';
    import type { Snippet } from 'svelte';
    import { quadInOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';

    import { dev } from '$app/environment';
    import { IconButton, Input, TextIconButton, onOpenBottomSheet } from '$lib/components';
    import { initHeader, setSupabaseClient } from '$lib/context';
    import { checkAccess } from '$lib/db';
    import { scrollMainToTop } from '$lib/dom';
    import { SearchInput, Tabs } from '$lib/domain';

    import type { LayoutData } from './$types';

    type Props = { children: Snippet; data: LayoutData };
    let { children, data }: Props = $props();

    // Set the supbase client so that it can be used anywhere in the app
    setSupabaseClient(data.supabaseClient);
    let headerContext = initHeader();

    let hasAccess = $state(dev);
    let input = $state('');
    let isWrong = $state(false);

    const accessMutation = createMutation(
        {
            mutationFn: (password: string) => checkAccess(data.supabaseClient, password),
            onSuccess: (count) => {
                hasAccess = count === 1;
                isWrong = count !== 1;
            }
        },
        data.queryClient
    );

    const handleOnKeyPress = $derived((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            $accessMutation.mutate(input);
        }
    });

    const handleOnScroll = (e: Event) => {
        const node = e.currentTarget as HTMLElement;

        if (node.scrollTop > 100 && !headerContext.condensed) {
            headerContext.condensed = true;
        } else if (node.scrollTop <= 100 && headerContext.condensed) {
            headerContext.condensed = false;
        }
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
                    onclick={onOpenBottomSheet('filters')}
                    color="secondary"
                    size="small"
                />
            </div>
        {/if}
        <TextIconButton
            Icon={PlusIcon}
            color="primary"
            onclick={onOpenBottomSheet('addAppartment')}
            class="z-10"
        >
            New appartment
        </TextIconButton>
        {#if headerContext.condensed}
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

{#snippet login()}
    <div class="fixed inset-0 z-50 flex justify-center bg-primary" out:fade={{ duration: 200 }}>
        <div class="container flex w-full flex-col items-center justify-center gap-4 px-8 md:w-1/4">
            <div class="flex items-center gap-2">
                <KeyIcon class="stroke-white" />
                <h2 class="text-lg font-semibold text-white">What's the code, huh?</h2>
            </div>
            <Input
                placeholder="A very secret code"
                type="password"
                onkeypress={handleOnKeyPress}
                invalid={isWrong}
                bind:value={input}
            />
        </div>
    </div>
{/snippet}

<svelte:head>
    <title>🏡 Our future home</title>
</svelte:head>

<QueryClientProvider client={data.queryClient}>
    {#if !hasAccess}
        {@render login()}
    {:else}
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
    {/if}
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
