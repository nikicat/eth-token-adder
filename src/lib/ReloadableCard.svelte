<script lang="ts">
	import { Spinner } from 'flowbite-svelte'
	import ReloadButton from '$lib/ReloadButton.svelte'
	import { type Loadable } from '@square/svelte-store'
	import MyCard from '$lib/MyCard.svelte'

	export let title: string
	export let store: Loadable<any>
	let state = store.state
</script>

<MyCard {...$$restProps}>
	<svelte:fragment slot="title">
		{title}
		{#if store.reload}
			<ReloadButton on:click={() => store.reload?.()} size="xs" />
		{/if}
	</svelte:fragment>
	{#await store.load()}
		<Spinner />
	{:then}
		{#if $state?.isReloading}
			<Spinner />
		{:else}
			<slot />
		{/if}
	{/await}
</MyCard>
