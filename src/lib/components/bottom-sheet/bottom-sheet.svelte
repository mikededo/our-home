<script lang="ts">
    import { XIcon } from 'lucide-svelte';
    import type { Snippet } from 'svelte';
    import { sineInOut } from 'svelte/easing';
    import { fade, slide } from 'svelte/transition';

    import { page } from '$app/stores';
    import { portal } from '$lib/actions';
    import { type Params, QueryKeys, QueryParams } from '$lib/config';

    import IconButton from '../icon-button.svelte';

    type Props = {
        /**
         * Param value to listen to for the "view" param
         */
        param: Params<'bottomSheet'>;
        header: string;
        children: Snippet;
        onBackdropClick?: () => void;
        onClose?: () => void;
    };
    let { children, header, param, onBackdropClick, onClose }: Props = $props();
    let show = $derived(
        $page.url.searchParams.get(QueryKeys.bottomSheet) === QueryParams.bottomSheet[param]
    );
</script>

{#if show}
    <div tabIndex="-1" use:portal>
        <div
            role="presentation"
            tabIndex="-1"
            class="fixed inset-0 z-50 overflow-auto bg-gray-900/80"
            in:fade={{ duration: 200 }}
            out:fade={{ duration: 100, delay: 150 }}
            onclick={onBackdropClick}
        ></div>
        <div
            class="overlflow-hidden fixed bottom-0 left-0 right-0 z-[51] max-h-[90vh] rounded-t-2xl bg-white transition"
            transition:slide={{ axis: 'y', duration: 300, easing: sineInOut }}
        >
            <div class="px-6 py-4">
                <div class="mb-3 flex items-center justify-between">
                    <h3 class="text-lg font-semibold">{header}</h3>
                    <IconButton color="muted" Icon={XIcon} onclick={onClose} />
                </div>
                {@render children()}
            </div>
        </div>
    </div>
{/if}
