<script lang="ts">
    import type { IconProps, Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';

    type IconButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';
    type IconButtonSizes = 'small' | 'default' | 'large';

    type Props = {
        Icon: ComponentType<LucideIcon>;
        size?: IconButtonSizes;
        color?: IconButtonColor;
        strokeWidth?: IconProps['strokeWidth'];
    } & Omit<HTMLButtonAttributes, 'children'>;
    const { Icon, size = 'default', color = 'muted', strokeWidth, ...restProps }: Props = $props();

    const iconWrapperClasses =
        'h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer';

    let iconProps = $derived({ strokeWidth });
    const iconSizes: Record<IconButtonSizes, string> = {
        small: 'w-4 h-4',
        default: 'w-5 h-5',
        large: 'w-6 h-6'
    };
    const colors: Record<IconButtonColor, string> = {
        primary:
            'bg-primary dark:bg-primary-800 text-white hover:bg-primary-600 hover:dark:bg-primary-900 stroke-white',
        secondary:
            'bg-secondary dark:bg-secondary-800 text-secondary-foreground hover:bg-secondary-100 dark:hover:bg-secondary-900 border border-transparent border-secondary-300 dark:border-secondary-700',
        muted: 'bg-transparent text-foreground hover:bg-muted stroke-foreground',
        destructive:
            'bg-destructive text-destructive-foreground hover:bg-destructive/90 stroke-destructive'
    };
</script>

<button {...restProps} class={twMerge(iconWrapperClasses, colors[color], restProps.class)}>
    <svelte:component
        this={Icon}
        class={twMerge(iconSizes[size], 'stroke-inherit')}
        {...iconProps}
    />
</button>
