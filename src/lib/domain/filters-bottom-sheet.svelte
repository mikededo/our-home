<script lang="ts">
    import type { CreateSliderProps } from '@melt-ui/svelte';
    import { PlusIcon } from 'lucide-svelte';
    import type { ChangeEventHandler } from 'svelte/elements';

    import { page } from '$app/stores';
    import {
        BottomSheet,
        RatingSelector,
        Select,
        Slider,
        TextIconButton,
        onCloseBottomSheet
    } from '$lib/components';
    import type { Agencies } from '$lib/db';
    import { Filters } from '$lib/helpers';

    type Props = { agencies?: Agencies };
    let { agencies = [] }: Props = $props();

    let { priceRange, mRating, jRating } = $derived(Filters.filters($page.url.searchParams));
    let agenciesOptions = $derived(
        (agencies ?? []).reduce(
            (acc, { id, name }) => ({ ...acc, [`${id}`]: name }) as Record<string, string>,
            {} as Record<string, string>
        )
    );

    const handleOnPriceRangeChange: CreateSliderProps['onValueChange'] = ({ next }) => {
        Filters.apply('priceRange', `${next[0]}_${next[1]}`);

        return next;
    };

    const handleOnUpdateRating = (rating: 'm' | 'j') => (i: number) => {
        Filters.apply(rating === 'm' ? 'mRating' : 'jRating', `${i + 1}`);
    };

    const handleOnUpdateAgency: ChangeEventHandler<HTMLSelectElement> = (e) => {
        Filters.apply('realStateAgency', `${e.currentTarget.value}`);
    };
</script>

<BottomSheet
    param="filters"
    header="Filters"
    onBackdropClick={onCloseBottomSheet}
    onClose={onCloseBottomSheet}
>
    <div class="flex flex-col gap-4">
        <Slider
            label="Price range"
            defaultValue={priceRange}
            min={Filters.PRICE_RANGE_MIN}
            max={Filters.PRICE_RANGE_MAX}
            step={Filters.PRICE_RANGE_STEP}
            onValueChange={handleOnPriceRangeChange}
        />
        <Select
            label="Real State Agency"
            name="agency"
            id="agency"
            disabled={!agencies}
            options={agenciesOptions}
            onchange={handleOnUpdateAgency}
        />
        <RatingSelector
            label="M's rating"
            rating={mRating}
            onUpdateRating={handleOnUpdateRating('m')}
        />
        <RatingSelector
            label="J's rating"
            rating={jRating}
            onUpdateRating={handleOnUpdateRating('j')}
        />
        <div class="mx-auto mt-3">
            <TextIconButton Icon={PlusIcon} type="submit">Apply filters</TextIconButton>
        </div>
    </div>
</BottomSheet>
