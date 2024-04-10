<script>
	import PortalInfo from '$lib/PortalInfo.svelte'
	import SymBtcInfo from '$lib/SymBtcInfo.svelte'
	import WalletInfo from '$lib/WalletInfo.svelte'
	// @ts-expect-error
	import { connected, chainId, chainData } from 'svelte-ethers-store'

	const SEPOLIA_CHAIN_ID = 11155111
</script>

<svelte:head>
	<title>SymBTC bridge</title>
	<meta name="description" content="SymBTC bridge" />
</svelte:head>

<section class="flex flex-col items-center gap-8">
	<PortalInfo />
	{#if $connected}
		{#if $chainId !== SEPOLIA_CHAIN_ID}
			<p>
				Your are connected to the wrong network ("{$chainData.name}")". Please connect to the
				testnet Sepolia.
			</p>
		{:else}
			<WalletInfo />
			<SymBtcInfo />
		{/if}
	{/if}
</section>

<style>
</style>
