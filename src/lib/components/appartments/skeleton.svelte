{#each { length: 3 } as _}
    <div class="mt-4 flex w-full flex-col gap-3 rounded-lg border px-4 py-3">
        <div class="h-8 w-full rounded-full bg-secondary"></div>
        <div class="flex flex-col text-sm">
            <div class="mb-1 flex justify-between text-sm">
                <div class="h-4 w-32 rounded-full bg-secondary"></div>
                <div class="h-4 w-24 rounded-full bg-secondary"></div>
            </div>
            <div class="h-4 w-32 rounded-full bg-secondary"></div>
        </div>
        <div class="flex w-full items-center justify-between">
            <div class="flex flex-col gap-2">
                <div class="h-4 w-24 rounded-full bg-secondary"></div>
                <div class="flex gap-2">
                    <div class="size-5 rounded-full bg-secondary"></div>
                    <div class="size-5 rounded-full bg-secondary"></div>
                    <div class="size-5 rounded-full bg-secondary"></div>
                    <div class="size-5 rounded-full bg-secondary"></div>
                    <div class="size-5 rounded-full bg-secondary"></div>
                </div>
            </div>
            <div class="flex flex-col items-end gap-2">
                <div class="h-4 w-24 rounded-full bg-secondary"></div>
                <div class="flex gap-2">
                    <div class="size-5 rounded-full bg-secondary"></div>
                    <div class="size-5 rounded-full bg-secondary"></div>
                    <div class="size-5 rounded-full bg-secondary"></div>
                    <div class="size-5 rounded-full bg-secondary"></div>
                    <div class="size-5 rounded-full bg-secondary"></div>
                </div>
            </div>
        </div>
    </div>
{/each}
