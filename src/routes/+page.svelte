<script>
	import { onMount } from 'svelte';
	import TokenAdder from './TokenAdder.svelte';
	import {
		connected,
		chainId,
		signerAddress,
		defaultEvmStores as evm
	} from 'svelte-ethers-store';

	onMount(evm.setProvider);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if !$connected}
		<p>My application is not yet connected</p>
	{:else}
		<p>account: {$signerAddress}</p>
		<p>chainId: {$chainId}</p>
	{/if}
	<TokenAdder />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
