<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';
    import { PlusIcon, SaveIcon, SlidersHorizontalIcon, XIcon } from 'lucide-svelte';

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { AppartmentsList, BottomSheet, TextIconButton } from '$lib/components';
    import { Keys } from '$lib/config';
    import { getAppartments } from '$lib/db';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();
    let { supabaseClient } = data;

    const appartmentsQuery = createQuery({
        queryKey: Keys.Appartments,
        queryFn: () => getAppartments(supabaseClient)
    });

    const handleOnClick = () => {
        const params = new URLSearchParams($page.url.searchParams);
        params.set('view', 'add-appartment');
        goto(`?${params.toString()}`);
    };

    const handleOnCloseBottomSheet = () => {
        const params = new URLSearchParams($page.url.searchParams);
        params.delete('view');
        goto(`?${params.toString()}`);
    };
</script>

{#snippet add_button()}
    <div class="fixed bottom-4 left-0 right-0">
        <TextIconButton class="mx-auto" Icon={PlusIcon} color="primary" onclick={handleOnClick}>
            New appartment
        </TextIconButton>
    </div>
{/snippet}

<div class="container px-6 pb-[68px] pt-4">
    <div class="mb-4 flex w-full items-center justify-between gap-1">
        <h2 class="text-lg font-semibold">Appartments list</h2>
        <TextIconButton Icon={SlidersHorizontalIcon} color="secondary" class="p-1.5" />
    </div>

    <AppartmentsList appartments={$appartmentsQuery.data} />
</div>

<BottomSheet param="add-appartment" onBackdropClick={handleOnCloseBottomSheet}>
    <h3 class="mb-3 text-lg font-semibold">Create an appartment</h3>
    <form class="flex w-full flex-col gap-3">
        <div class="flex flex-col gap-1">
            <label for="name" class="text-sm">Name</label>
            <input
                id="name"
                placeholder="Casernes A PB 1r"
                class="rounded-xl bg-secondary px-4 py-2 text-black"
            />
        </div>
        <div class="flex flex-col gap-1">
            <label for="place" class="text-sm">Place</label>
            <input
                id="place"
                placeholder="Girona (Casernes)"
                class="rounded-xl bg-secondary px-4 py-2 text-black"
            />
        </div>
        <div class="flex flex-col gap-1">
            <label for="price" class="text-sm">Price</label>
            <input
                id="price"
                placeholder="380000"
                type="number"
                class="rounded-xl bg-secondary px-4 py-2 text-black"
            />
        </div>
        <div class="flex flex-col gap-1">
            <label for="real-state-agency" class="text-sm">Real State Agency</label>
            <input
                id="real-state-agency"
                placeholder="Finques Colomé"
                class="rounded-xl bg-secondary px-4 py-2 text-black"
            />
        </div>
        <div class="flex flex-col gap-1">
            <label for="website-url" class="text-sm">Website URL</label>
            <input
                id="website-url"
                placeholder="https://..."
                class="rounded-xl bg-secondary px-4 py-2 text-black"
            />
        </div>
        <div class="flex items-center justify-end gap-2">
            <TextIconButton Icon={XIcon} color="secondary" onclick={handleOnCloseBottomSheet}
                >Cancel</TextIconButton
            >
            <TextIconButton Icon={SaveIcon} type="submit">Save</TextIconButton>
        </div>
    </form>
</BottomSheet>
{@render add_button()}
