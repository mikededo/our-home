<script lang="ts">
    import { createSlider, melt } from '@melt-ui/svelte';

    import { getEuro } from '$lib/helpers';

    type Props = {
        min: number;
        max: number;
        step?: number;
        label?: string;
        defaultValue?: number[];
        onValueCommitted?: (value: number[]) => void;
    };
    let { min, max, label, step, defaultValue, onValueCommitted }: Props = $props();

    const {
        elements: { root, range, thumbs },
        states: { value: internalValue }
    } = createSlider({ defaultValue, min, max, step, onValueCommitted });
</script>

<div use:melt={$root} class="relative flex w-full flex-col gap-1">
    {#if label}
        <p class="text-xs font-semibold uppercase">{label}</p>
    {/if}
    <div class="relative mx-1 flex h-5 items-center">
        <span class="h-[3px] w-full bg-secondary">
            <span use:melt={$range} class="h-[3px] bg-primary"></span>
        </span>

        {#each $thumbs as thumb}
            <span
                use:melt={thumb}
                class="size-4 rounded-full bg-primary outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            ></span>
        {/each}
    </div>
    <div class="flex justify-between text-sm font-semibold">
        <span>{getEuro($internalValue[0])}</span>
        <span>{$internalValue[1] === max ? '+' : ''}{getEuro($internalValue[1])}</span>
    </div>
</div>
