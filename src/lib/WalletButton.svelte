<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import Jazzicon from '$lib/Jazzicon.svelte'
	import { signer } from '$lib/contracts'
</script>

{#await signer.load() then}
	{#if $signer}
		<Button class="gap-4">
			<Jazzicon address={$signer.address} />
			{$signer.address.substring(0, 10)}
		</Button>
	{:else}
		<Button>Connect Wallet</Button>
	{/if}
{/await}
