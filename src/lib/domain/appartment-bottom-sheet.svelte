<script lang="ts">
    import { SaveIcon, XIcon } from 'lucide-svelte';

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { BottomSheet, IconButton, RatingSelector, TextIconButton } from '$lib/components';
    import { QueryKeys } from '$lib/config';
    import { preventDefault } from '$lib/events';

    let mRating = $state(0);
    let jRating = $state(1);

    const handleOnUpdateRating = (rating: 'm' | 'j') => (i: number) => {
        if (rating === 'm') {
            mRating = i + 1;
        } else {
            jRating = i + 1;
        }
    };

    const handleOnCloseBottomSheet = () => {
        const params = new URLSearchParams($page.url.searchParams);
        params.delete(QueryKeys.bottomSheet);
        goto(`?${params.toString()}`);
    };

    const handleOnSubmit = () => {
        console.log('submit');
    };
</script>

<BottomSheet param="addAppartment">
    <div class="mb-3 flex items-center justify-between">
        <h3 class="text-lg font-semibold">Create an appartment</h3>
        <IconButton color="muted" Icon={XIcon} onclick={handleOnCloseBottomSheet} />
    </div>
    <form class="flex w-full flex-col gap-4" onsubmit={preventDefault(handleOnSubmit)}>
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
        <div class="flex justify-between">
            <div class="flex flex-col gap-1">
                <label for="image-url" class="text-sm">M's rating</label>
                <RatingSelector rating={mRating} onUpdateRating={handleOnUpdateRating('m')} />
            </div>
            <div class="flex flex-col gap-1">
                <label for="image-url" class="text-right text-sm">J's rating</label>
                <RatingSelector rating={jRating} onUpdateRating={handleOnUpdateRating('j')} right />
            </div>
        </div>
        <div class="mt-3 flex items-center justify-end gap-2">
            <TextIconButton
                type="button"
                Icon={XIcon}
                color="secondary"
                onclick={handleOnCloseBottomSheet}
            >
                Cancel
            </TextIconButton>
            <TextIconButton Icon={SaveIcon} type="submit">Save</TextIconButton>
        </div>
    </form>
</BottomSheet>
