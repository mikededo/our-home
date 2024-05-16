<script lang="ts">
    import type { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';

    import { sharedClasses } from './shared';

    type ButtonVariant = 'condensed' | 'default';
    type ButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';

    type Props = HTMLButtonAttributes & {
        variant?: ButtonVariant;
        color?: ButtonColor;
        Icon: ComponentType<LucideIcon>;
        class?: string;
    };
    let { variant, color, children, Icon, ...restProps }: Props = $props();

    const classes = sharedClasses({
        variant,
        color,
        className: `${restProps.class} flex gap-1.5 items-center`
    });
</script>

<button {...restProps} class={classes}>
    <svelte:component this={Icon} class="size-4" />
    {#if children}
        <span>{@render children()}</span>
    {/if}
</button>
