<script lang="ts">
	import { Card, Spinner } from 'flowbite-svelte'
	import { RefreshOutline } from 'flowbite-svelte-icons'
	import { fetchAddressTxs } from './forwarder-store'
	import WrapInfo from './WrapInfo.svelte'
	import { asyncReadable } from '@square/svelte-store'
	import IconButton from '$lib/IconButton.svelte'
	import { slide } from 'svelte/transition'

	export let address: string

	const txs = asyncReadable(
		[],
		async () => {
			return (await fetchAddressTxs(address)).data.data.transactions
		},
		{ reloadable: true, trackState: true }
	)
	const txsState = txs.state
</script>

{#if $txsState?.isLoading || $txsState?.isReloading}
	<Spinner />
{:else if $txsState?.isLoaded}
	<IconButton on:click={() => txs.reload?.()}>
		<RefreshOutline size="xs" />
	</IconButton>
	<ul>
		{#each $txs as tx (tx.commitTx)}
			<li transition:slide>
				<Card size="lg">
					<WrapInfo tx={tx.commitTx} />
				</Card>
			</li>
		{/each}
	</ul>
{/if}
