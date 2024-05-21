<script lang="ts">
    import { BirdIcon } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { getHeaderContext } from '$lib/context';
    import type { Appartment, Appartments } from '$lib/db';
    import { getEuro } from '$lib/helpers';

    type Props = { appartments?: Appartments };
    let { appartments }: Props = $props();

    let headerContext = getHeaderContext();

    let matches = $derived.by(() => {
        if (!appartments) {
            return [];
        }

        return appartments.reduce<{ html: string; appartment: Appartment }[]>((acc, appartment) => {
            if (!appartment.name || !headerContext.value) {
                return acc;
            }

            const match = appartment.name.match(new RegExp(headerContext.value, 'gi'));
            if (!match) {
                return acc;
            }

            const html = appartment.name
                .split(new RegExp(`(${headerContext.value})`, 'gi'))
                .reduce(
                    (acc, slice, i) => `${acc}${i % 2 === 0 ? slice : `<strong>${slice}</strong>`}`,
                    ''
                );

            return [...acc, { appartment, html }];
        }, []);
    });
</script>

{#if headerContext.value && headerContext.focused}
    <div
        class="fixed bottom-0 left-0 right-0 z-50 overflow-auto bg-white py-4"
        class:h-main-sm={!headerContext.condensed}
        class:h-main-full={headerContext.condensed}
        transition:fade={{ duration: 150 }}
    >
        <h2 class="mb-2 px-6 text-lg font-semibold">
            Search results
            {#if matches.length > 0}({matches.length}){/if}
        </h2>
        {#if matches.length}
            <div class=" flex flex-col gap-[1px]">
                {#each matches as { html, appartment }}
                    <div
                        class="flex cursor-pointer flex-col gap-1 px-6 py-2 transition hover:bg-secondary"
                    >
                        <p>
                            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                            {@html html}
                        </p>
                        <div class="flex items-center justify-between">
                            <p class="text-sm text-secondary-600">
                                {appartment.place}
                            </p>
                            <p class="text-sm text-secondary-600">
                                {getEuro(appartment.price!)}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="mt-6 flex w-full flex-col items-center gap-4">
                <BirdIcon size={128} class="text-secondary-700" />
                <p class="text-secondary-700">This is empty...</p>
            </div>
        {/if}
    </div>
{/if}
