<script lang="ts">
	import { slide } from "svelte/transition"
	import { Card } from "flowbite-svelte"
	import type { Writable } from "@square/svelte-store"
	import { TrashBinOutline } from "flowbite-svelte-icons"
	import ForwarderAddress from "$lib/ForwarderAddress.svelte"
	import IconButton from "$lib/IconButton.svelte"
	import { type BtcforwarderAddressInfo } from "$lib/forwarder-api"
	import MyCard from "$lib/MyCard.svelte"

    export let addresses: Writable<BtcforwarderAddressInfo[]>
</script>


<MyCard title="Addresses">
    <div class="flex flex-col gap-4 w-full">
        {#each $addresses as info (info.revealAddress)}
            <div transition:slide class="w-full">
                <Card size="lg">
                    <ForwarderAddress addressInfo={info}>
                        <IconButton
                            on:click={() => ($addresses = $addresses.filter((info_) => info_ != info))}
                            title="forget"
                        >
                            <TrashBinOutline size="xs" />
                        </IconButton>
                    </ForwarderAddress>
                </Card>
            </div>
        {/each}
    </div>
</MyCard>