<script lang="ts">
    import { getHeaderContext } from '$lib/context';
    let headerContext = getHeaderContext();

    const handleOnFocus = () => {
        headerContext.focused = true;
    };

    const handleOnBlur = () => {
        headerContext.focused = false;
    };
</script>

<input
    class="mb-1 h-12 w-full rounded-full bg-white px-5 text-black"
    placeholder="Search an appartment"
    onfocus={handleOnFocus}
    onblur={handleOnBlur}
    bind:value={headerContext.value}
/>
