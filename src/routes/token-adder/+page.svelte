<script>
	import { onMount } from 'svelte';
	import TokenAdder from '$lib/TokenAdder.svelte';
	import {
		connected,
		defaultEvmStores as evm
	} from 'svelte-ethers-store';

	onMount(evm.setProvider);
</script>

<svelte:head>
	<title>SybBTC bridge</title>
	<meta name="description" content="SymBTC bridge" />
</svelte:head>

<section>
    {#if $connected}
	<TokenAdder />
    {/if}
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
