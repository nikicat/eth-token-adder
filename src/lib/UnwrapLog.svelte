<script lang="ts">
	import { Card } from 'flowbite-svelte'
	import { asyncDerived } from '@square/svelte-store'
	import { synthesis } from '$lib/contracts'
	import Labeled from '$lib/Labeled.svelte'
	import Satoshi from '$lib/Satoshi.svelte'
	import EtherscanLink from '$lib/EtherscanLink.svelte'
	import { getAddress } from '$lib/bitcoin'
	import { info } from '$lib/forwarder-store'
	import MempoolLink from '$lib/MempoolLink.svelte'
	import Jazzicon from '$lib/Jazzicon.svelte'
	import ReloadableCard from '$lib/ReloadableCard.svelte'

	const events = asyncDerived(
		synthesis,
		async ($synthesis) => {
			return $synthesis.queryFilter($synthesis.filters.BurnRequestBTC())
		},
		{ reloadable: true, trackState: true }
	)
</script>

<ReloadableCard title="Unwraps" store={events}>
	{#each $events.reverse() as event (event.args.burnSerial)}
		<Card size="lg" class="mt-4">
			<h3>#{event.args.burnSerial}</h3>
			{#await event.getBlock() then block}
				<Labeled label="Block Number">
					{#if block.hash}
						<EtherscanLink type="block" value={block.hash}>{block.number}</EtherscanLink>
					{:else}
						{block.number}
					{/if}
				</Labeled>
				<Labeled label="Timestamp">
					{new Date(block.timestamp * 1000).toISOString().substring(0, 19)}
				</Labeled>
			{/await}
			{#await event.getTransaction() then tx}
				<Labeled label="Transaction">
					<EtherscanLink type="tx" value={tx.hash} />
				</Labeled>
			{/await}
			<Labeled label="From">
				<div class="flex flex-row items-center gap-2">
					<Jazzicon address={event.args.from} size={16} />
					<EtherscanLink value={event.args.from} />
				</div>
			</Labeled>
			<Labeled label="Amount">
				<Satoshi value={event.args.amount} />
			</Labeled>
			<Labeled label="To">
				{#await info.load() then}
					<MempoolLink type="address" value={getAddress(event.args.to, $info.chain)} />
				{/await}
			</Labeled>
		</Card>
	{/each}
</ReloadableCard>
