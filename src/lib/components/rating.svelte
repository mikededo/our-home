<script lang="ts">
    import { CatIcon } from 'lucide-svelte';

    type Props = { text: string; rating?: number | null; right?: boolean };
    let { text, rating, right = false }: Props = $props();
</script>

<div class="flex flex-col items-start gap-1">
    <p class="w-full" class:text-right={right}>{text}</p>
    <div class="flex items-center gap-0.5" class:flex-row-reverse={right}>
        {#each { length: 5 } as _, i (i)}
            <CatIcon
                size={20}
                class={(rating ?? 0) > i ? 'stroke-primary' : 'stroke-secondary-300'}
            />
        {/each}
    </div>
</div>
