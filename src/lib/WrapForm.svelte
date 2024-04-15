<script lang="ts">
	import { slide } from 'svelte/transition'
	import { Card, Input } from 'flowbite-svelte'
	import { TrashBinOutline } from 'flowbite-svelte-icons'
	import { initiateWrap } from '$lib/forwarder-store'
	import { type BtcforwarderAddressInfo } from '$lib/forwarder-api'
	import ForwarderAddress from './ForwarderAddress.svelte'
	import IconButton from '$lib/IconButton.svelte'
	import Labeled from '$lib/Labeled.svelte'
	import ReloadableCard from '$lib/ReloadableCard.svelte'
	import { signer } from '$lib/contracts'
	import { ethers } from 'ethers'
	import ActionWithError from './ActionWithError.svelte'
	import type { Writable } from '@square/svelte-store'

	let revealFeeLimit: number = 1000
	export let addresses: Writable<BtcforwarderAddressInfo[]>
	async function wrap() {
		const wrapResponse = await $initiateWrap({
			commitFee: 0,
			info: {
				to: to,
			},
			revealFeeLimit: Number(revealFeeLimit),
		})
		$addresses = [wrapResponse.data.data, ...$addresses]
	}
	$: to = $signer?.address || ''
</script>

<ReloadableCard title="Wrap" store={signer}>
	<Labeled label="To">
		<Input bind:value={to} />
	</Labeled>

	<Labeled label="Fee Limit (sat)">
		<Input type="number" bind:value={revealFeeLimit} />
	</Labeled>

	<ActionWithError action={wrap} disabled={!ethers.isAddress(to)}>Get new address</ActionWithError>
</ReloadableCard>
