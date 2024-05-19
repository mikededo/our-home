<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';

    import { inputClasses } from './input';

    type Props = HTMLInputAttributes & {
        invalid?: boolean;
        label?: string;
    };

    let { label, value, name, invalid, ...restProps }: Props = $props();
    let classes = inputClasses({ className: restProps.class, invalid });
</script>

<div class="flex w-full flex-col items-start gap-2">
    {#if label}
        <label for={name} class="text-xs font-semibold uppercase">{label}</label>
    {/if}
    <input {name} class={classes} bind:value {...restProps} />
</div>
