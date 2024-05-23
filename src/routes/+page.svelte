<script lang="ts">
    import { createMutation, createQuery } from '@tanstack/svelte-query';
    import { KeyIcon, ListFilterIcon } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { dev } from '$app/environment';
    import { AppartmentsList, IconButton, Input } from '$lib/components';
    import { Keys } from '$lib/config';
    import { checkAccess, getAgencies, getAppartments } from '$lib/db';
    import { AppartmentBottomSheet, SearchResults } from '$lib/domain';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();
    let { supabaseClient } = data;

    let hasAccess = $state(dev);
    let input = $state('');
    let isWrong = $state(false);

    const appartmentsQuery = $derived(
        createQuery({
            queryKey: Keys.Appartments,
            queryFn: () => getAppartments(supabaseClient),
            enabled: hasAccess
        })
    );
    const agenciesQuery = $derived(
        createQuery({
            queryKey: Keys.Agencies,
            queryFn: () => getAgencies(supabaseClient),
            enabled: hasAccess
        })
    );

    const accessMutation = createMutation({
        mutationFn: (password: string) => checkAccess(supabaseClient, password),
        onSuccess: (count) => {
            hasAccess = count === 1;
            isWrong = count !== 1;
        }
    });

    const handleOnKeyPress = $derived((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            $accessMutation.mutate(input);
        }
    });
</script>

{#if !hasAccess}
    <div class="fixed inset-0 z-50 flex justify-center bg-primary" out:fade={{ duration: 200 }}>
        <div class="container flex w-full flex-col items-center justify-center gap-4 px-8 md:w-1/4">
            <div class="flex items-center gap-2">
                <KeyIcon class="stroke-white" />
                <h2 class="text-lg font-semibold text-white">What's the code, huh?</h2>
            </div>
            <Input
                placeholder="A very secret code"
                type="password"
                onkeypress={handleOnKeyPress}
                invalid={isWrong}
                bind:value={input}
            />
        </div>
    </div>
{:else}
    <div class="container pb-[68px]" in:fade={{ duration: 200 }}>
        <div class="mb-4 flex w-full items-center justify-between gap-1">
            <h2 class="text-lg font-semibold">Appartments list</h2>
            <IconButton Icon={ListFilterIcon} color="muted" size="small" />
        </div>

        <AppartmentsList appartments={$appartmentsQuery.data} />
    </div>

    <SearchResults appartments={$appartmentsQuery.data} />
    <AppartmentBottomSheet agencies={$agenciesQuery.data} />
{/if}
