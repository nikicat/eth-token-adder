<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte'

	export let action: () => Promise<unknown>
	export let disabled = false

	let request: Promise<unknown> | null = null
	let err: string | null
	interface ResponseError extends Response {
		error: {
			message: string
		}
	}
	let respErr: ResponseError | null
	async function clicked() {
		err = null
		respErr = null
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

<Button on:click={clicked} disabled={request !== null || disabled} class="mt-8 w-48">
	{#if request !== null}
		<Spinner size={4} class="me-4" />
	{/if}
	<slot />
</Button>
<div class="w-full overflow-scroll text-red-800 dark:text-red-400">
	{#if respErr}
		<p>action failed: <a href={respErr.url}>{respErr.url}</a> returned</p>
		<pre>[{respErr.status}] {respErr.statusText}</pre>
		<pre>{respErr.error.message}</pre>
	{:else if err}
		{err}
	{/if}
</div>
