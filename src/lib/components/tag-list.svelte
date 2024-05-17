<script lang="ts">
    import type { Appartment } from '$lib/db';

    type Props = { tags?: Appartment['tags'] };
    let { tags }: Props = $props();
</script>

{#if tags && tags.length}
    <div class="flex flex-wrap gap-1">
        {#each tags as tag (tag.id)}
            {#if tag.name}
                <div class="rounded-full border border-primary px-2 py-0.5 text-xs text-primary">
                    {tag.name}
                </div>
            {/if}
        {/each}
    </div>
{/if}
