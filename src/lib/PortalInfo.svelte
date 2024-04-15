<script>
	import Labeled from '$lib/Labeled.svelte'
	import { info } from '$lib/forwarder-store'
	import MempoolLink from '$lib/MempoolLink.svelte'
	import ReloadableCard from '$lib/ReloadableCard.svelte'
</script>

<ReloadableCard title="BTC Portal info" store={info}>
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
</ReloadableCard>
