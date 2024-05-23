<script lang="ts">
    import { MoveLeftIcon } from 'lucide-svelte';

    import { page } from '$app/stores';

    const tabs = [
        // { name: 'Home', path: '/',}
        { name: 'Mortgage calculator', path: '/mortgage' }
    ];
</script>

<div class="container flex flex-row pb-2 md:py-2">
    {#if $page.url.pathname !== '/'}
        <a href="/" class="flex h-[22px] items-center gap-2">
            <MoveLeftIcon size={18} />
            <span class="text-sm font-semibold">Back</span>
        </a>
    {/if}
    {#each tabs as { name, path }, i (i)}
        {#if $page.url.pathname !== path}
            <a
                href={path}
                class="rounded-full border border-primary px-2 py-0.5 text-xs text-primary"
            >
                {name}
            </a>
        {/if}
    {/each}
</div>
