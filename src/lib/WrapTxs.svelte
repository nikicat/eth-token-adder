<script lang="ts">
	import { slide } from 'svelte/transition'
	import { Card } from 'flowbite-svelte'
	import { asyncDerived } from '@square/svelte-store'

	import { fetchAddressTxs } from '$lib/forwarder-store'
	import WrapInfo from '$lib/WrapInfo.svelte'
	import ReloadableCard from './ReloadableCard.svelte'

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

<ReloadableCard title="Transactions" store={txs}>
	<ul class="w-full">
		{#each $txs as tx (tx.commitTx)}
			<li transition:slide>
				<Card size="lg">
					<WrapInfo tx={tx.commitTx} />
				</Card>
			</li>
		{/each}
	</ul>
</ReloadableCard>
