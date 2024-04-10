<script>
	import Labeled from '$lib/Labeled.svelte'
	import { Card } from 'flowbite-svelte'
	import { info } from '$lib/forwarder-store'
	import MempoolLink from '$lib/MempoolLink.svelte'
</script>

<Card size="lg" class="gap-4">
	<h3 class="font-lg font-bold">BTC Portal info</h3>
	{#if $info}
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
	{/if}
</Card>
