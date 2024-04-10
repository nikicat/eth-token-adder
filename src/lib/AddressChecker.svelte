<script lang="ts">
	import { Card, Input, Label } from 'flowbite-svelte'
	import WrapTxs from './WrapTxs.svelte'

	let address: string
</script>

<Card>
    <h3>Check address status</h3>
	<Label>Address</Label>
	<Input bind:value={address} />
	{#if address}
		<Label>Transactions:</Label>
		<WrapTxs address={address} />
	{/if}
</Card>
