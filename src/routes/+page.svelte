<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';
    import { ListFilterIcon } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { AppartmentsList, IconButton, onOpenBottomSheet } from '$lib/components';
    import { Keys } from '$lib/config';
    import { getAgencies, getAppartments } from '$lib/db';
    import { AppartmentBottomSheet, FiltersBottomSheet, SearchResults } from '$lib/domain';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();
    let { supabaseClient } = data;

    const appartmentsQuery = $derived(
        createQuery({
            queryKey: Keys.Appartments,
            queryFn: () => getAppartments(supabaseClient)
        })
    );
    const agenciesQuery = $derived(
        createQuery({
            queryKey: Keys.Agencies,
            queryFn: () => getAgencies(supabaseClient)
        })
    );
</script>

<div class="container pb-[68px]" in:fade={{ duration: 200 }}>
    <div class="mb-4 flex w-full items-center justify-between gap-1">
        <h2 class="text-lg font-semibold">Appartments list</h2>
        <IconButton
            Icon={ListFilterIcon}
            color="muted"
            size="small"
            onclick={onOpenBottomSheet('filters')}
        />
    </div>

    <AppartmentsList appartments={$appartmentsQuery.data} />
</div>

<SearchResults appartments={$appartmentsQuery.data} />
<AppartmentBottomSheet agencies={$agenciesQuery.data} />
<FiltersBottomSheet agencies={$agenciesQuery.data} />
