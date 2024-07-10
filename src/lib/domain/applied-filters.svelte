<script lang="ts">
    import { XIcon } from 'lucide-svelte';

    import { page } from '$app/stores';
    import { type Agencies, DEFAULT_NONE_AGENCY_ID } from '$lib/db';
    import { Filters, getEuro } from '$lib/helpers';

    type Props = { agencies: NonNullable<Agencies> };
    let { agencies }: Props = $props();

    const onClearFilter = (rating: Parameters<typeof Filters.remove>[0]) => () => {
        Filters.remove(rating);
    };

    let params = $derived($page.url.searchParams);
    let appliedFilters = $derived.by(() => {
        const result: Record<string, () => void> = {};
        const filters = Filters.filters(params);

        if (filters.jRating) {
            result[`J Rating: ${filters.jRating}`] = onClearFilter('jRating');
        }
        if (filters.mRating) {
            result[`M Rating: ${filters.jRating}`] = onClearFilter('mRating');
        }

        if (filters.realStateAgency && filters.realStateAgency !== DEFAULT_NONE_AGENCY_ID) {
            const agency = agencies.find(({ id }) => id === filters.realStateAgency);
            if (agency) {
                result[`Agency: ${agency.name}`] = onClearFilter('realStateAgency');
            }
        }

        const [priceMin, priceMax] = filters.priceRange;
        if (priceMin !== Filters.PRICE_RANGE_MIN || priceMax !== Filters.PRICE_RANGE_MAX) {
            result[`${getEuro(priceMin)} - ${getEuro(priceMax)}`] = onClearFilter('priceRange');
        }

        return result;
    });
</script>

{#if Object.keys(appliedFilters).length}
    <div class="mt-2 flex flex-wrap gap-1">
        {#each Object.entries(appliedFilters) as [filter, onClick]}
            <button
                class="flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-2 py-0.5 text-xs text-white"
                onclick={onClick}
            >
                <span>{filter}</span>
                <XIcon size={14} />
            </button>
        {/each}
        <!-- TODO: Add reset filter  -->
    </div>
{/if}
