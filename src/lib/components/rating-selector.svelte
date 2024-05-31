<script lang="ts">
    import { CatIcon, StarIcon, XIcon } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    import IconButton from './icon-button.svelte';

    type Props = {
        label?: string;
        rating: number;
        onUpdateRating: (i: number) => void;
        onClearRating?: () => void;
    };
    let { label, rating, onUpdateRating, onClearRating }: Props = $props();

    let getClasses = $derived((i: number) =>
        twMerge('transition-colors', rating > i ? 'stroke-primary' : 'stroke-secondary-300')
    );

    const handleOnUpdateRating = (i: number) => () => {
        onUpdateRating(i);
    };
</script>

<div class="flex flex-col gap-2">
    {#if label}
        <p class="text-xs font-semibold uppercase">{label}</p>
    {/if}
    <div class="flex h-8 w-full justify-between">
        <div class="flex items-center gap-2">
            {#each { length: 6 } as _, i}
                {#if i < 5}
                    <button type="button" onclick={handleOnUpdateRating(i)}>
                        <CatIcon size={24} class={getClasses(i)} />
                    </button>
                {:else}
                    <button type="button" onclick={handleOnUpdateRating(i)}>
                        <StarIcon size={24} class={getClasses(i)} />
                    </button>
                {/if}
            {/each}
        </div>
        {#if onClearRating && rating > 0}
            <div transition:fade={{ duration: 150 }}>
                <IconButton Icon={XIcon} color="muted" onclick={onClearRating} size="small" />
            </div>
        {/if}
    </div>
</div>
