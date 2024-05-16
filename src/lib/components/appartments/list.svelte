<script lang="ts">
    import type { Appartments } from '$lib/db';

    import Rating from '../rating.svelte';
    import TagList from '../tag-list.svelte';

    type Props = { appartments: NonNullable<Appartments> };
    let { appartments }: Props = $props();

    const getEuro = (price: number) =>
        price.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        });
</script>

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
            <Rating text="J's rating" rating={aptm?.j_rating} />
        </div>

        <TagList tags={aptm.tags} />
    </div>
{/each}
