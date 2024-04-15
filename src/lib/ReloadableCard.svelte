<script lang="ts">
	import { Card, Spinner } from 'flowbite-svelte'
	import ReloadButton from '$lib/ReloadButton.svelte'
	import { get, type Loadable } from '@square/svelte-store'

	export let title: string
	export let store: Loadable<any>
	let state = store.state
</script>

<Card size="lg" class="flex flex-col items-center">
	<h3 class="flex flex-row items-center justify-between text-xl pb-6 w-full">
		{title}
		{#if store.reload}
			<ReloadButton on:click={() => store.reload?.()} size="xs" />
		{/if}
	</h3>
	{#await store.load()}
		<Spinner />
	{:then}
		{#if $state?.isReloading}
			<Spinner />
		{:else}
			<slot />
		{/if}
	{/await}
</Card>
