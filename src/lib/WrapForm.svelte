<script lang="ts">
	import { slide } from 'svelte/transition'
	import { Button, Card, Input, Spinner } from 'flowbite-svelte'
	import { TrashBinOutline } from 'flowbite-svelte-icons'
	import { initiateWrap, type WrapResponse } from '$lib/forwarder-store'
	import { type BtcforwarderAddressInfo } from '$lib/forwarder-api'
	import ForwarderAddress from './ForwarderAddress.svelte'
	import IconButton from '$lib/IconButton.svelte'
	import Labeled from '$lib/Labeled.svelte'
	import { fixPersisted } from '$lib/utils'
	import ReloadableCard from '$lib/ReloadableCard.svelte'
	import { signer } from '$lib/contracts'
	import { ethers } from 'ethers'

	let revealFeeLimit: number = 1000
	const addresses = fixPersisted([] as BtcforwarderAddressInfo[], 'forwarder-addresses')
	let wrapRequest: Promise<WrapResponse> | null = null
	let err: string
	interface ResponseError extends Response {
		error: {
			message: string
		}
	}
	let respErr: ResponseError
	async function wrapClicked() {
		try {
			wrapRequest = $initiateWrap({
				commitFee: 0,
				info: {
					to: to,
				},
				revealFeeLimit: revealFeeLimit,
			})
			const wrapResponse = await wrapRequest
			$addresses = [wrapResponse.data.data, ...$addresses]
		} catch (e) {
			console.log('error', e)
			if (e instanceof Response) {
				respErr = e as ResponseError
			} else {
				err = JSON.stringify(e)
			}
		}
		wrapRequest = null
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

	<Button
		on:click={wrapClicked}
		disabled={wrapRequest !== null && ethers.isAddress(to)}
		class="w-48"
	>
		{#if wrapRequest !== null}
			<Spinner size={4} class="me-4" />
		{/if}
		Get new address
	</Button>
	<div class="text-red-800">
		{#if respErr}
			<p>request failed: <a href={respErr.url}>{respErr.url}</a> returned</p>
			<pre>[{respErr.status}] {respErr.statusText}</pre>
			<pre>{respErr.error.message}</pre>
		{:else if err}
			{err}
		{/if}
	</div>
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
</ReloadableCard>
