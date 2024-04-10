<script lang="ts">
	import MempoolLink from '$lib/MempoolLink.svelte'
	import { getWrap } from '$lib/forwarder-store'
	import Satoshi from '$lib/Satoshi.svelte'
	import Labeled from '$lib/Labeled.svelte'

	export let tx: string
</script>

<div>
	{#await getWrap(tx) then wrap}
		<Labeled label="Amount">
			<Satoshi value={wrap.data.data.wrapInfo.value} />
		</Labeled>
		{#if wrap.data.data.txInfo.incomeTx}
			<Labeled label="Income tx">
				<MempoolLink type="tx" value={wrap.data.data.txInfo.incomeTx} />
			</Labeled>
		{/if}
		<Labeled label="Commit tx">
			<MempoolLink type="tx" value={wrap.data.data.txInfo.commitTx} />
		</Labeled>
		{#if wrap.data.data.txInfo.revealTx}
			<Labeled label="Reveal tx">
				<MempoolLink type="tx" value={wrap.data.data.txInfo.revealTx} />
			</Labeled>
		{/if}
	{/await}
</div>
