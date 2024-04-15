<script lang="ts">
	import { Input } from 'flowbite-svelte'
	import { asyncDerived } from '@square/svelte-store'

	import { symbtc, synthesis, signerTokenBalance } from '$lib/contracts'
	import Labeled from '$lib/Labeled.svelte'
	import Satoshi from '$lib/Satoshi.svelte'
	import EtherscanLink from '$lib/EtherscanLink.svelte'
	import { getPkScript } from '$lib/bitcoin'
	import { info } from '$lib/forwarder-store'
	import ReloadableCard from '$lib/ReloadableCard.svelte'
	import ActionWithError from '$lib/ActionWithError.svelte'

	let amount: number = 4000 // satoshi
	let to: string = 'tb1qkpsdsmlws0k4cwdz8p6k2s6wghsypgfg3fs55y'
	const clientId = '0x1234560000000000000000000000000000000000000000000000000000000000'
</script>

<ReloadableCard title="Unwrap" store={asyncDerived([symbtc, synthesis, signerTokenBalance], async () => {})}>
	<Labeled label="Synthesis address">
		{#await $symbtc.synthesis() then address}
			<EtherscanLink value={address} />
		{/await}
	</Labeled>
	<Labeled label="Wallet balance">
		<Satoshi value={$signerTokenBalance || -1} />
	</Labeled>
	<Labeled label="Amount">
		<Input type="number" bind:value={amount} />
	</Labeled>
	<Labeled label="To (Bitcoin Address)">
		<Input bind:value={to} />
	</Labeled>
	<ActionWithError
		action={async () =>
			$synthesis.burnSyntheticTokenBTC(
				0,
				amount,
				getPkScript(to, $info.chain),
				await $symbtc.getSyntToken(),
				clientId
			)}
	>
		Unwrap
	</ActionWithError>
</ReloadableCard>
