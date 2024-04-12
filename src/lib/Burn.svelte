<script lang="ts">
	import { Card, Input, Spinner, Button } from 'flowbite-svelte'
	import { loadAll } from '@square/svelte-store'
	import { synthesis, signerTokenBalance, btcToken } from '$lib/contracts'
	import Labeled from '$lib/Labeled.svelte'
	import Satoshi from '$lib/Satoshi.svelte'
	import EtherscanLink from '$lib/EtherscanLink.svelte'
	import { getPkScript } from '$lib/bitcoin'
	import { info } from '$lib/forwarder-store'

	let amount: number = 4000
	let to: string = 'tb1qkpsdsmlws0k4cwdz8p6k2s6wghsypgfg3fs55y'
	const clientId = '0x1234560000000000000000000000000000000000000000000000000000000000'
</script>

<Card size="lg" class="flex flex-col gap-4">
	<h3>Unwrap</h3>
	{#await loadAll([synthesis, btcToken])}
		<Spinner />
	{:then}
		<Labeled label="Synthesis address">
			<EtherscanLink address={$synthesis.address} />
		</Labeled>
		<Labeled label="Wallet balance">
			<Satoshi value={$signerTokenBalance} />
		</Labeled>
		<Labeled label="Amount">
			<Input type="number" bind:value={amount} />
		</Labeled>
		<Labeled label="To (Bitcoin Address)">
			<Input bind:value={to} />
		</Labeled>
		<Button
			on:click={() =>
				$synthesis.burnSyntheticTokenBTC(
					0,
					amount,
					getPkScript(to, $info.chain),
					$btcToken.address,
					clientId,
				)}
		>
			Unwrap
		</Button>
	{/await}
</Card>
