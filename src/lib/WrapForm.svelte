<script lang="ts">
	import { Button, Card, Input, Spinner } from 'flowbite-svelte'
	import { initiateWrap, type WrapResponse } from './forwarder-store'
	import { signerAddress } from 'svelte-ethers-store'
	import { persisted, type Writable, get } from '@square/svelte-store'
	import type { BtcforwarderAddressInfo } from './forwarder-api'
	import ForwarderAddress from './ForwarderAddress.svelte'
	import { TrashBinOutline } from 'flowbite-svelte-icons'
	import IconButton from '$lib/IconButton.svelte'
	import Labeled from '$lib/Labeled.svelte'
	import { slide } from 'svelte/transition'

	function fixPersisted<T>(initial: T, store: Writable<T>): Writable<T> {
		return {
			subscribe: (run: (value: any) => void, invalidate?) => {
				return store.subscribe((value: any) => {
					if (value !== undefined) {
						run(value)
					} else {
						run(initial)
					}
				}, invalidate)
			},
			set: store.set,
			update: store.update,
		}
	}

	let revealFeeLimit: number = 1000
	const addresses = fixPersisted(
		[],
		persisted([] as BtcforwarderAddressInfo[], 'forwarder-addresses')
	)
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
</Card>
