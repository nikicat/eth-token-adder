<script lang="ts">
	import { Input } from 'flowbite-svelte'
	import type { BtcforwarderAddressInfo } from '$lib/forwarder-api'
	import Satoshi from '$lib/Satoshi.svelte'
	import Timer from '$lib/Timer.svelte'
	import WrapTxs from '$lib/WrapTxs.svelte'
	import EtherscanLink from '$lib/EtherscanLink.svelte'
	import Labeled from '$lib/Labeled.svelte'

	export let addressInfo: BtcforwarderAddressInfo
</script>

<div class="flex flex-col items-start gap-2">
	<Labeled label="Taproot address">
		<Input value={addressInfo.revealAddress} readonly size="sm" />
	</Labeled>
	<Labeled label="P2SH address">
		<Input value={addressInfo.legacyAddress} readonly size="sm" />
	</Labeled>
	<Labeled label="Valid for">
		<Timer until={new Date(addressInfo.validUntil)} />
	</Labeled>
	<Labeled label="Min amount">
		<Satoshi value={addressInfo.revealFeeLimit} />
	</Labeled>
	<Labeled label="Destination">
		<EtherscanLink type="address" address={addressInfo.info.to} id="eth" />
	</Labeled>
	<Labeled label="Transactions">
		<WrapTxs address={addressInfo.revealAddress} />
	</Labeled>
	<slot />
</div>
