<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';
    import { PlusIcon, SlidersHorizontalIcon } from 'lucide-svelte';

    import { AppartmentsList, TextIconButton } from '$lib/components';
    import { Keys } from '$lib/config';
    import { getAppartments } from '$lib/db';

    import type { PageData } from './$types';

    export let data: PageData;
    const { supabaseClient } = data;

    const appartmentsQuery = createQuery({
        queryKey: Keys.Appartments,
        queryFn: () => getAppartments(supabaseClient)
    });
</script>

{#snippet add_button()}
    <div class="fixed bottom-4 left-0 right-0">
        <TextIconButton class="mx-auto" Icon={PlusIcon} color="primary">
            New appartment
        </TextIconButton>
    </div>
{/snippet}

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
