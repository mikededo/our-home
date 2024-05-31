<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';
    import { ListFilterIcon, SquirrelIcon } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { page } from '$app/stores';
    import {
        AppartmentsList,
        AppartmentsSkeleton,
        ErrorBanner,
        IconButton,
        onOpenBottomSheet
    } from '$lib/components';
    import { Keys } from '$lib/config';
    import { type AppartmentFilters, getAgencies, getFilteredAppartments } from '$lib/db';
    import {
        AppartmentBottomSheet,
        AppliedFilters,
        FiltersBottomSheet,
        SearchResults
    } from '$lib/domain';
    import { Filters } from '$lib/helpers';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();
    let { supabaseClient, queryClient, initialFilters } = data;

    let filters = $state<AppartmentFilters>(initialFilters);
    let hasFilters = $derived(Filters.count($page.url.searchParams));

    const appartmentsQuery = $derived(
        createQuery(
            {
                queryKey: Keys.FilteredAppartments(
                    hasFilters ? JSON.stringify(filters) : undefined
                ),
                queryFn: () => getFilteredAppartments(supabaseClient, filters!)
            },
            queryClient
        )
    );
    const agenciesQuery = $derived(
        createQuery({
            queryKey: Keys.Agencies,
            queryFn: () => getAgencies(supabaseClient)
        })
    );

    const handleOnSubmit = (appliedFilters: AppartmentFilters) => {
        filters = appliedFilters;
    };
</script>

<div class="container pb-[68px]" in:fade={{ duration: 200 }}>
    <div class="flex w-full items-center justify-between gap-1">
        <h2 class="text-lg font-semibold">Appartments list</h2>
        <div class="relative">
            <IconButton
                Icon={ListFilterIcon}
                color="secondary"
                size="small"
                onclick={onOpenBottomSheet('filters')}
            />
            {#if hasFilters}
                <span
                    transition:fade
                    class="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-primary"
                ></span>
            {/if}
        </div>
    </div>

    <AppliedFilters />
    {#if $appartmentsQuery.isLoading}
        <AppartmentsSkeleton />
    {:else if $appartmentsQuery.isError}
        <ErrorBanner>There was an error fetching the results</ErrorBanner>
    {:else if $appartmentsQuery.data}
        {#if $appartmentsQuery.data.length}
            <AppartmentsList appartments={$appartmentsQuery.data} />
        {:else}
            <ErrorBanner Icon={SquirrelIcon}
                >No results found! Try changing the filters or performing a different search!</ErrorBanner
            >
        {/if}
    {/if}
</div>

<SearchResults appartments={$appartmentsQuery.data} />
<AppartmentBottomSheet agencies={$agenciesQuery.data} />
<FiltersBottomSheet agencies={$agenciesQuery.data} onSubmit={handleOnSubmit} />
