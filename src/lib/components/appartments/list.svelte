<script lang="ts">
    import { fade } from 'svelte/transition';

    import type { Appartments } from '$lib/db';
    import { getEuro } from '$lib/helpers';

    import Skeleton from './skeleton.svelte';
    import Rating from '../rating.svelte';
    import TagList from '../tag-list.svelte';

    type Props = { appartments?: Appartments };
    let { appartments }: Props = $props();
</script>

{#if appartments}
    <section class="flex w-full flex-col gap-2 md:grid md:grid-cols-2 md:gap-4" in:fade>
        {#each appartments as aptm (aptm.id)}
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
                    <Rating text="M's rating" rating={aptm?.m_rating} />
                    <Rating text="J's rating" rating={aptm?.j_rating} right />
                </div>

                <TagList tags={aptm.tags} />
            </div>
        {/each}
    </section>
{:else}
    <section class="flex w-full animate-pulse flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
        {#each { length: 3 } as _}
            <Skeleton />
        {/each}
    </section>
{/if}
