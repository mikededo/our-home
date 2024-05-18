<script lang="ts">
    import { CatIcon } from 'lucide-svelte';
    import { twMerge } from 'tailwind-merge';

    type Props = {
        rating: number;
        right?: boolean;
        onUpdateRating: (i: number) => void;
    };
    let { rating, right, onUpdateRating }: Props = $props();

    let getClasses = $derived((i: number) =>
        twMerge('transition-colors', rating > i ? 'stroke-primary' : 'stroke-secondary-300')
    );

    const handleOnUpdateRating = (i: number) => () => {
        onUpdateRating(i);
    };
</script>

<div class="flex items-center gap-2" class:flex-row-reverse={right}>
    {#each { length: 5 } as _, i}
        <button type="button" onclick={handleOnUpdateRating(i)}>
            <CatIcon size={20} class={getClasses(i)} />
        </button>
    {/each}
</div>
