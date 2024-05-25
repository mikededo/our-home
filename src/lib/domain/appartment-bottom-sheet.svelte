<script lang="ts">
    import { createMutation, useQueryClient } from '@tanstack/svelte-query';
    import { SaveIcon, XIcon } from 'lucide-svelte';

    import {
        BottomSheet,
        Input,
        RatingSelector,
        Select,
        TextIconButton,
        onCloseBottomSheet
    } from '$lib/components';
    import { Keys } from '$lib/config';
    import { getSupabaseClient } from '$lib/context';
    import type { Agencies, AppartmentData, Appartments } from '$lib/db';
    import { createAppartment } from '$lib/db';
    import { scrollMainToTop } from '$lib/dom';
    import { preventDefault } from '$lib/events';

    type Props = { agencies?: Agencies };
    let { agencies = [] }: Props = $props();

    const queryClient = useQueryClient();
    const supabaseClient = getSupabaseClient();
    let options = $derived(
        (agencies ?? []).reduce(
            (acc, { id, name }) => ({ ...acc, [`${id}`]: name }) as Record<string, string>,
            {} as Record<string, string>
        )
    );
    let mRating = $state(0);
    let jRating = $state(0);

    const mutation = createMutation({
        mutationFn: async (data: AppartmentData) => await createAppartment(supabaseClient, data),
        onSuccess: (data) => {
            const appartments = queryClient.getQueryData<Appartments>(Keys.Appartments);
            if (appartments && data) {
                queryClient.setQueryData(Keys.Appartments, [...data, ...appartments]);
            }

            onCloseBottomSheet();
            scrollMainToTop();
        }
    });

    const handleOnUpdateRating = (rating: 'm' | 'j') => (i: number) => {
        if (rating === 'm') {
            mRating = i + 1;
        } else {
            jRating = i + 1;
        }
    };

    const handleOnSubmit = (e: SubmitEvent) => {
        const form = e.target as HTMLFormElement;
        const { agency, m2, price, ...fields } = Object.fromEntries(new FormData(form)) as Record<
            string,
            string
        >;

        $mutation.mutate({
            ...fields,
            price: +price,
            m2: +m2,
            real_state_agency_id: +agency,
            rating: [mRating, jRating]
        } as AppartmentData);
    };
</script>

<BottomSheet
    param="addAppartment"
    header="Create an appartment"
    onBackdropClick={onCloseBottomSheet}
    onClose={onCloseBottomSheet}
>
    <form class="flex w-full flex-col gap-4" onsubmit={preventDefault(handleOnSubmit)}>
        <Input label="Name" name="name" id="name" placeholder="Casernes A PB 1r" />
        <Input label="Place" name="place" id="place" placeholder="Girona (Casernes)" />
        <Input label="Price" name="price" id="price" placeholder="380000" type="number" />
        <Input label="M2" name="m2" id="m2" placeholder="100" type="number" />
        <Select
            label="Real State Agency"
            name="agency"
            id="agency"
            disabled={!agencies}
            {options}
        />
        <Input label="Website URL" name="website" id="website" placeholder="https://..." />
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
        <div class="mt-3 flex items-center justify-end gap-2">
            <TextIconButton
                type="button"
                Icon={XIcon}
                color="secondary"
                disabled={$mutation.isPending}
                onclick={onCloseBottomSheet}
            >
                Cancel
            </TextIconButton>
            <TextIconButton Icon={SaveIcon} type="submit" disabled={$mutation.isPending}>
                Save
            </TextIconButton>
        </div>
    </form>
</BottomSheet>
