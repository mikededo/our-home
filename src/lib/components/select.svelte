<script lang="ts">
    import { ChevronDownIcon } from 'lucide-svelte';
    import type { HTMLSelectAttributes } from 'svelte/elements';

    import { inputClasses } from './input';

    type Props = HTMLSelectAttributes & {
        options: Record<string, string>;
        label?: string;
        initialValue?: string;
    };
    let { options, label, name, initialValue, ...restProps }: Props = $props();
    let classes = inputClasses({ className: restProps.class });
</script>

<div class="flex flex-col gap-1">
    {#if label}
        <label for={name} class="text-xs font-semibold uppercase">{label}</label>
    {/if}
    <div class="flex items-center">
        <select
            {name}
            class="{classes} appearance-none"
            {...restProps}
            value={initialValue ?? Object.keys(options)[0]}
        >
            {#each Object.entries(options) as [key, value]}
                <option value={key}>{value}</option>
            {/each}
        </select>
        <ChevronDownIcon class="-ml-8 size-4" />
    </div>
</div>
