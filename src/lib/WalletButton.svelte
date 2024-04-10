<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { signerAddress } from 'svelte-ethers-store';
    // @ts-expect-error ts(7016)
	import { Jazzicon } from 'svelte-ethers-store/components';
</script>

{#if $signerAddress}
	<Button class="gap-4">
		<Jazzicon address={$signerAddress} />
		{$signerAddress.substring(0, 10)}
	</Button>
{:else}
	<Button>Connect Wallet</Button>
{/if}
