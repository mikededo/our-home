<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';
    import { ListFilterIcon } from 'lucide-svelte';

    import { AppartmentsList, IconButton } from '$lib/components';
    import { Keys } from '$lib/config';
    import { getAgencies, getAppartments } from '$lib/db';
    import { AppartmentBottomSheet } from '$lib/domain';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();
    let { supabaseClient } = data;

    const appartmentsQuery = createQuery({
        queryKey: Keys.Appartments,
        queryFn: () => getAppartments(supabaseClient)
    });
    const agenciesQuery = createQuery({
        queryKey: Keys.Agencies,
        queryFn: () => getAgencies(supabaseClient)
    });
</script>

<div class="container pb-[68px]">
    <div class="mb-4 flex w-full items-center justify-between gap-1">
        <h2 class="text-lg font-semibold">Appartments list</h2>
        <IconButton Icon={ListFilterIcon} color="muted" size="small" />
    </div>

    <AppartmentsList appartments={$appartmentsQuery.data} />
</div>

<AppartmentBottomSheet agencies={$agenciesQuery.data} />
