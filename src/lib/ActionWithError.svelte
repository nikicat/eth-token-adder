<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte'

	export let action: () => Promise<unknown>
	export let disabled = false

	let request: Promise<unknown> | null = null
	let err: string
	interface ResponseError extends Response {
		error: {
			message: string
		}
	}
	let respErr: ResponseError
	async function clicked() {
		try {
			await action()
		} catch (e) {
			console.log('error', e)
			if (e instanceof Response) {
				respErr = e as ResponseError
			} else {
				err = JSON.stringify(e)
			}
		}
		request = null
	}
</script>

<Button on:click={clicked} disabled={request !== null && !disabled} class="w-48 mt-8">
	{#if request !== null}
		<Spinner size={4} class="me-4" />
	{/if}
	<slot />
</Button>
<div class="text-red-800 dark:text-red-400 w-full overflow-scroll">
	{#if respErr}
		<p>action failed: <a href={respErr.url}>{respErr.url}</a> returned</p>
		<pre>[{respErr.status}] {respErr.statusText}</pre>
		<pre>{respErr.error.message}</pre>
	{:else if err}
		{err}
	{/if}
</div>
