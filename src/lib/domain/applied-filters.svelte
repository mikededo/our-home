<script lang="ts">
    import { XIcon } from 'lucide-svelte';

    import { page } from '$app/stores';
    import { Filters, getEuro } from '$lib/helpers';

    let params = $derived($page.url.searchParams);
    let appliedFilters = $derived.by(() => {
        const result: string[] = [];
        const filters = Filters.filters(params);

        if (filters.jRating) {
            result.push(`J Rating: ${filters.jRating}`);
        }
        if (filters.mRating) {
            result.push(`M Rating: ${filters.mRating}`);
        }

        const [priceMin, priceMax] = filters.priceRange;
        if (priceMin !== Filters.PRICE_RANGE_MIN || priceMax !== Filters.PRICE_RANGE_MAX) {
            result.push(`${getEuro(priceMin)} - ${getEuro(priceMax)}`);
        }

        return result;
    });
</script>

{#if appliedFilters.length}
    <div class="mt-2 flex flex-wrap gap-1">
        {#each appliedFilters as filter}
            <div
                class="flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-2 py-0.5 text-xs text-white"
            >
                <span>{filter}</span>
                <XIcon size={14} />
            </div>
        {/each}
    </div>
{/if}
