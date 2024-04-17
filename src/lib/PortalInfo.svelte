<script>
	import { asyncDerived } from '@square/svelte-store'
	import Labeled from '$lib/Labeled.svelte'
	import { finalizedState, info, pendingState } from '$lib/forwarder-store'
	import MempoolLink from '$lib/MempoolLink.svelte'
	import ReloadableCard from '$lib/ReloadableCard.svelte'
	import MyCard from '$lib/MyCard.svelte'
	import Satoshi from './Satoshi.svelte'
</script>

<ReloadableCard
	title="BTC Portal info"
	store={asyncDerived([info, finalizedState, pendingState], async () => {})}
	class="gap-4"
>
	<Labeled label="Chain">
		{$info.chain}
	</Labeled>
	<Labeled label="Current address">
		<MempoolLink type="address" value={$info.btcPortalAddress || ''} chain={$info.chain}
			>{$info.btcPortalAddress}</MempoolLink
		>
	</Labeled>
	<Labeled label="Genesis Tx">
		<MempoolLink type="tx" value={$info.txListener.btcPortal.genesisTx} chain={$info.chain}
			>{$info.txListener.btcPortal.genesisTx}</MempoolLink
		>
	</Labeled>
	<MyCard title="Pending State">
		<Labeled label="Last tx">
			<MempoolLink type="tx" value={$pendingState.lastTxId} chain={$info.chain} />
		</Labeled>
		<Labeled label="Total locked">
			<Satoshi value={$pendingState.totalLocked} />
		</Labeled>
		<Labeled label="Fee locked">
			<Satoshi value={$pendingState.feeLocked} />
		</Labeled>
	</MyCard>
	<MyCard title="Finalized State">
		<Labeled label="Last tx">
			<MempoolLink type="tx" value={$finalizedState.lastTxId} chain={$info.chain} />
		</Labeled>
		<Labeled label="Total locked">
			<Satoshi value={$finalizedState.totalLocked} />
		</Labeled>
		<Labeled label="Fee locked">
			<Satoshi value={$finalizedState.feeLocked} />
		</Labeled>
	</MyCard>
</ReloadableCard>
