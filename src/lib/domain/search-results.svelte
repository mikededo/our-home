<script lang="ts">
    import { fade } from 'svelte/transition';

    import { getHeaderContext } from '$lib/context';
    import type { Appartment, Appartments } from '$lib/db';
    import { getEuro } from '$lib/helpers';

    type Props = { appartments?: Appartments };
    let { appartments }: Props = $props();

    let headerContext = getHeaderContext();

    let matches = $derived(() => {
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
                .reduce((acc, slice, i) => {
                    if (i % 2 === 0) {
                        console.log({ slice });
                        acc.push(slice);
                    } else {
                        console.log({ slice });
                        acc.push(`<strong>${slice}</strong>`);
                    }

                    return acc;
                }, [] as string[])
                .join('');

            return [...acc, { appartment, html }];
        }, []);
    });
</script>

{#if headerContext.focused}
    <div
        class="fixed bottom-0 left-0 right-0 z-50 bg-white px-6 py-4"
        class:h-main-sm={!headerContext.condensed}
        class:h-main-full={headerContext.condensed}
        transition:fade={{ duration: 150 }}
    >
        <h2 class="mb-2 text-lg font-semibold">Search results</h2>
        <div class="-mx-3 flex flex-col gap-[1px]">
            {#each matches() as { html, appartment }}
                <div
                    class="flex cursor-pointer flex-col gap-1 rounded-lg px-3 py-2 transition hover:bg-secondary"
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
    </div>
{/if}
