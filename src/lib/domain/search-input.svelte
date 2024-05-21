<script lang="ts">
    import { XIcon } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { IconButton } from '$lib/components';
    import { getHeaderContext } from '$lib/context';

    let headerContext = getHeaderContext();

    const handleOnFocus = () => {
        headerContext.focused = true;
    };

    const handleOnBlur = () => {
        headerContext.focused = false;
    };

    const handleOnClearInput = () => {
        headerContext.value = '';
    };
</script>

<div class="mb-1 flex items-center">
    <input
        class="h-12 w-full rounded-full bg-white px-5 text-black"
        placeholder="Search an appartment"
        onfocus={handleOnFocus}
        onblur={handleOnBlur}
        bind:value={headerContext.value}
    />
    {#if headerContext.value}
        <div class="-ml-10" transition:fade={{ duration: 150 }}>
            <IconButton Icon={XIcon} color="muted" size="small" onclick={handleOnClearInput} />
        </div>
    {/if}
</div>
