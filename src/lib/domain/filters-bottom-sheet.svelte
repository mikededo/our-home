<script lang="ts">
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
    import { QueryKeys } from '$lib/config';
    import { type Agencies, type AppartmentFilters, DEFAULT_NONE_AGENCY_ID } from '$lib/db';
    import { Filters } from '$lib/helpers';

    type Props = { agencies?: Agencies; onSubmit: (filters: AppartmentFilters) => void };
    let { agencies = [], onSubmit }: Props = $props();

    let hasChanged = $state(false);
    let tempFiltersState = $state(Filters.filters($page.url.searchParams));
    let { priceRange, mRating, jRating, realStateAgency } = $derived(
        Filters.filters($page.url.searchParams)
    );
    let agenciesOptions = $derived(
        (agencies ?? []).reduce(
            (acc, { id, name }) => ({ ...acc, [`${id}`]: name }) as Record<string, string>,
            {} as Record<string, string>
        )
    );

    const handleOnClose = () => {
        const params = new URLSearchParams($page.url.searchParams);
        params.delete(QueryKeys.bottomSheet);

        Filters.reset(params, tempFiltersState);
        hasChanged = false;
    };

    const handleOnPriceRangeChange = (value: number[]) => {
        if (value[0] === Filters.PRICE_RANGE_MIN && value[1] === Filters.PRICE_RANGE_MAX) {
            Filters.remove('priceRange');
        } else {
            Filters.apply('priceRange', `${value[0]}_${value[1]}`);
        }

        hasChanged = true;
        return value;
    };

    const handleOnUpdateRating = (rating: 'm' | 'j') => (i: number) => {
        Filters.apply(rating === 'm' ? 'mRating' : 'jRating', `${i + 1}`);
        hasChanged = true;
    };

    const handleOnClearRating = (rating: 'm' | 'j') => () => {
        Filters.remove(rating === 'm' ? 'mRating' : 'jRating');
        hasChanged = true;
    };

    const handleOnUpdateAgency: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const { value } = e.currentTarget;
        if (value === `${DEFAULT_NONE_AGENCY_ID}`) {
            Filters.remove('realStateAgency');
        } else {
            Filters.apply('realStateAgency', `${value}`);
        }
        hasChanged = true;
    };

    const handleOnSubmit = () => {
        const filters = Filters.filters($page.url.searchParams);
        tempFiltersState = filters;

        onSubmit({
            priceRange:
                filters.priceRange[0] === Filters.PRICE_RANGE_MIN &&
                filters.priceRange[1] === Filters.PRICE_RANGE_MAX
                    ? undefined
                    : (filters.priceRange as [number, number]),
            mRating: filters.mRating === 0 ? undefined : filters.mRating,
            jRating: filters.jRating === 0 ? undefined : filters.jRating,
            realStateAgency: filters.realStateAgency ? +filters.realStateAgency : undefined
        });
        onCloseBottomSheet();
    };
</script>

<BottomSheet
    param="filters"
    header="Filters"
    onBackdropClick={handleOnClose}
    onClose={handleOnClose}
>
    <div class="flex flex-col gap-4">
        <Slider
            label="Price range"
            defaultValue={priceRange}
            min={Filters.PRICE_RANGE_MIN}
            max={Filters.PRICE_RANGE_MAX}
            step={Filters.PRICE_RANGE_STEP}
            onChangesCommited={handleOnPriceRangeChange}
        />
        <Select
            label="Real State Agency"
            name="agency"
            id="agency"
            initialValue={`${realStateAgency}`}
            disabled={!agencies}
            options={agenciesOptions}
            onchange={handleOnUpdateAgency}
        />
        <RatingSelector
            label="M's rating"
            rating={mRating}
            onUpdateRating={handleOnUpdateRating('m')}
            onClearRating={handleOnClearRating('m')}
        />
        <RatingSelector
            label="J's rating"
            rating={jRating}
            onUpdateRating={handleOnUpdateRating('j')}
            onClearRating={handleOnClearRating('j')}
        />
        <div class="mx-auto mt-3">
            <TextIconButton
                Icon={PlusIcon}
                type="button"
                onclick={handleOnSubmit}
                disabled={!hasChanged}
            >
                Apply filters
            </TextIconButton>
        </div>
    </div>
</BottomSheet>
