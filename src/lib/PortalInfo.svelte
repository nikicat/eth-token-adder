<script>
	import Labeled from '$lib/Labeled.svelte'
	import { finalizedState, info, pendingState } from '$lib/forwarder-store'
	import MempoolLink from '$lib/MempoolLink.svelte'
	import ReloadableCard from '$lib/ReloadableCard.svelte'
	import { asyncDerived } from '@square/svelte-store'
</script>

<ReloadableCard title="BTC Portal info" store={asyncDerived([info, finalizedState, pendingState], async () => {})}>
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
	<Labeled label="Pedning last tx">
		<MempoolLink type="tx" value={$pendingState.lastTxId} chain={$info.chain} />
	</Labeled>
	<Labeled label="Finalized last tx">
		<MempoolLink type="tx" value={$finalizedState.lastTxId} chain={$info.chain} />
	</Labeled>
</ReloadableCard>
