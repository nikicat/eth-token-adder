<script lang="ts">
	import { slide } from 'svelte/transition'
	import { Card, Spinner } from 'flowbite-svelte'
	import { RefreshOutline } from 'flowbite-svelte-icons'
	import { asyncDerived } from '@square/svelte-store'

	import { fetchAddressTxs } from '$lib/forwarder-store'
	import WrapInfo from '$lib/WrapInfo.svelte'
	import IconButton from '$lib/IconButton.svelte'

	export let address: string

	const txs = asyncDerived(
		[fetchAddressTxs],
		async ([$fetchAddressTxs]) => {
			return (await $fetchAddressTxs(address)).data.data.transactions
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
