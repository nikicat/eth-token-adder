<script lang="ts">
	import { Button, Card, Input, Spinner } from 'flowbite-svelte'
	import { initiateWrap, type WrapResponse } from './forwarder-store'
	import { signerAddress } from 'svelte-ethers-store'
	import { persisted } from '@square/svelte-store'
	import type { BtcforwarderAddressInfo } from './forwarder-api'
	import ForwarderAddress from './ForwarderAddress.svelte'
	import { TrashBinOutline } from 'flowbite-svelte-icons'
	import IconButton from '$lib/IconButton.svelte'
	import Labeled from '$lib/Labeled.svelte'
	import { slide } from 'svelte/transition'

	let revealFeeLimit: number = 1000
	const addresses = persisted([] as BtcforwarderAddressInfo[], 'forwarder-addresses')
	console.log('addresses', $addresses)
	let wrapRequest: Promise<WrapResponse> | null = null
	async function wrapClicked() {
		wrapRequest = initiateWrap({
			commitFee: 0,
			info: {
				to: to,
			},
			revealFeeLimit: revealFeeLimit,
		})
		const wrapResponse = await wrapRequest
		wrapRequest = null
		$addresses = [wrapResponse.data.data, ...$addresses]
	}
	$: to = $signerAddress
</script>

<Card class="items-center gap-2" size="lg">
	<h3>Wrap</h3>

	<Labeled label="To">
		<Input bind:value={to} />
	</Labeled>

	<Labeled label="Fee Limit (sat)">
		<Input type="number" bind:value={revealFeeLimit} />
	</Labeled>

	<Button on:click={wrapClicked} disabled={wrapRequest !== null} class="w-48">
		{#if wrapRequest !== null}
			<Spinner size={4} class="me-4" />
		{/if}
		Get new address
	</Button>
	<Labeled label="Addresses">
		<div class="flex flex-col gap-4">
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
	</Labeled>
</Card>
