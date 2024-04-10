<script lang="ts">
	import { timer, toString } from '$lib/timer'

	export let until: Date

	$: validFor = timer(until)
</script>

{#if $validFor < 0}
	<span class="text-red-700">expired</span>
{:else}
	{toString($validFor)}
{/if}
