<script>
	import { onMount } from 'svelte';
	import Burn from '$lib/Burn.svelte';
	import {
		connected,
		defaultEvmStores as evm
	} from 'svelte-ethers-store';

	onMount(evm.setProvider);
</script>

<svelte:head>
	<title>SybBTC bridge - Burn</title>
</svelte:head>

<section>
    {#if $connected}
	<Burn />
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
