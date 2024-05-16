<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';
    import { CatIcon, SlidersHorizontalIcon } from 'lucide-svelte';

    import { TextIconButton } from '$lib/components';
    import { Keys } from '$lib/config';
    import { getAppartments } from '$lib/db';

    import type { PageData } from './$types';

    export let data: PageData;
    const { supabaseClient } = data;

    const appartmentsQuery = createQuery({
        queryKey: Keys.Appartments,
        queryFn: () => getAppartments(supabaseClient)
    });

    const getEuro = (price: number) =>
        price.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        });
</script>

<div class="container px-6 pb-[68px] pt-4">
    <div class="mb-4 flex w-full items-center justify-between gap-1">
        <h2 class="text-lg font-semibold">Appartments list</h2>
        <TextIconButton Icon={SlidersHorizontalIcon} color="secondary" class="p-1.5" />
    </div>

    <section class="flex w-full flex-col gap-2">
        {#if $appartmentsQuery.isLoading}
            <p>Loading</p>
        {:else if $appartmentsQuery.data}
            {#each $appartmentsQuery.data as aptm (aptm.id)}
                <div class="flex w-full flex-col gap-3 rounded-lg border px-4 py-3">
                    <h3 class="font-semibold">{aptm.name}</h3>
                    <div class="flex flex-col text-sm">
                        <div class="flex justify-between text-sm">
                            <p>{aptm.place}</p>
                            <p>{aptm.price ? getEuro(aptm.price) : ' - '}</p>
                        </div>
                        <p>{aptm.real_state_agency?.name}</p>
                    </div>
                    <div class="flex w-full items-center justify-between">
                        <div class="flex flex-col items-start gap-1">
                            <span>M's rating</span>
                            <div class="flex items-center gap-0.5">
                                {#each { length: 5 } as _, i (i)}
                                    <CatIcon
                                        size={20}
                                        class={(aptm?.m_rating ?? 0) > i
                                            ? 'stroke-primary'
                                            : 'stroke-secondary-300'}
                                    />
                                {/each}
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-1">
                            <span>J's rating</span>
                            <div class="flex items-center gap-0.5">
                                {#each { length: 5 } as _, i (i)}
                                    <CatIcon
                                        size={20}
                                        class={(aptm?.j_rating ?? 0) < 5 - i
                                            ? 'stroke-secondary-300'
                                            : 'stroke-primary'}
                                    />
                                {/each}
                            </div>
                        </div>
                    </div>

                    {#if aptm.tags}
                        <div class="flex flex-wrap gap-1">
                            {#each aptm.tags as tag (tag.id)}
                                {#if tag.name}
                                    <div
                                        class="rounded-full border border-primary px-2 py-0.5 text-xs text-primary"
                                    >
                                        {tag.name}
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    {/if}
                </div>
            {/each}
        {/if}
    </section>
</div>
