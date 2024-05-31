<script lang="ts">
    import { AlertTriangleIcon, type Icon as LucideIcon } from 'lucide-svelte';
    // TODO: Replace deprecated ComonentType
    import type { ComponentType, Snippet } from 'svelte';

    type Props = { children: Snippet; Icon?: ComponentType<LucideIcon> };
    let { children, Icon = AlertTriangleIcon }: Props = $props();
</script>

<div
    class="mt-6 flex w-full flex-col items-center gap-4 rounded-lg bg-secondary px-4 py-8 text-secondary-700"
>
    <svelte:component this={Icon} size={40} />
    <p class="text-center text-sm">{@render children()}</p>
</div>
