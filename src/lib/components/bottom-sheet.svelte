<script lang="ts">
    import type { Snippet } from 'svelte';
    import { fade, slide } from 'svelte/transition';

    import { page } from '$app/stores';
    import { portal } from '$lib/actions';

    type Props = {
        /**
         * Param value to listen to for the "view" param
         */
        param: string;
        children: Snippet;
        onBackdropClick?: () => void;
    };
    let { children, param, onBackdropClick }: Props = $props();
    let show = $derived($page.url.searchParams.get('view') === param);
</script>

{#if show}
    <div tabIndex="-1" use:portal>
        <div
            role="presentation"
            tabIndex={-1}
            class="fixed inset-0 z-50 overflow-auto bg-gray-900/80"
            in:fade={{ duration: 150 }}
            out:fade={{ duration: 150, delay: 100 }}
            onclick={onBackdropClick}
        ></div>
        <div
            class="overlflow-hidden fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] rounded-t-2xl bg-white transition"
            transition:slide={{ axis: 'y' }}
        >
            <div class="px-6 py-4">
                {@render children()}
            </div>
        </div>
    </div>
{/if}
