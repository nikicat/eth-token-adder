<script lang="ts">
	import { info } from '$lib/forwarder-store'

	export let type: string = 'address'
	export let value: string
	export let chain: string = 'mainnet'
	export let shorten = false

	$: path = { mainnet: '', testnet3: 'testnet/' }[chain]
	$: chain = $info?.chain || chain
</script>

<a href="https://mempool.space/{path}{type}/{value}" target="_blank">
	<slot>
		{#if type == 'tx'}
			{#if shorten}
				{value.substring(0, 4)}…{value.substring(value.length - 4)}
			{:else}
				{value}
			{/if}
		{:else if type == ''}
			{chain}
		{:else}
			{value}
		{/if}
	</slot>
</a>
