<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';
    import { PlusIcon, SlidersHorizontalIcon } from 'lucide-svelte';
    import { sineInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';

    import { AppartmentsList, TextIconButton } from '$lib/components';
    import { Keys } from '$lib/config';
    import { getAppartments } from '$lib/db';

    import type { PageData } from './$types';

    export let data: PageData;
    const { supabaseClient } = data;

    let hideBar = false;

    const appartmentsQuery = createQuery({
        queryKey: Keys.Appartments,
        queryFn: () => getAppartments(supabaseClient)
    });

    const handleOnScroll = (e: Event) => {
        const node = e.currentTarget as HTMLElement;
        hideBar = node.scrollTop > 100;
    };
</script>

{#snippet nav()}
    <header class="flex min-h-24 w-full flex-col items-center bg-primary p-6 text-white transition">
        {#if !hideBar}
            <h1
                class="pb-4 text-2xl font-bold uppercase"
                transition:slide={{ axis: 'y', duration: 150, easing: sineInOut }}
            >
                Our future home
            </h1>
        {/if}
        <input
            class="h-12 w-full rounded-full bg-white px-5 text-black"
            placeholder="Search an appartment"
        />
    </header>
{/snippet}

{#snippet add_button()}
    <div class="fixed bottom-4 left-0 right-0">
        <TextIconButton class="mx-auto" Icon={PlusIcon} color="primary">
            New appartment
        </TextIconButton>
    </div>
{/snippet}

{@render nav()}
<main
    class=" overflow-y-auto"
    class:h-[calc(100dvh_-_144px)]={!hideBar}
    class:h-[calc(100dvh_-_96px)]={hideBar}
    onscroll={handleOnScroll}
>
    <div class="container px-6 pb-[68px] pt-4">
        <div class="mb-4 flex w-full items-center justify-between gap-1">
            <h2 class="text-lg font-semibold">Appartments list</h2>
            <TextIconButton Icon={SlidersHorizontalIcon} color="secondary" class="p-1.5" />
        </div>

        <section class="flex w-full flex-col gap-2">
            {#if $appartmentsQuery.isLoading}
                <p>Loading</p>
            {:else if $appartmentsQuery.data}
                <AppartmentsList appartments={$appartmentsQuery.data} />
            {/if}
        </section>
    </div>
    {@render add_button()}
</main>
