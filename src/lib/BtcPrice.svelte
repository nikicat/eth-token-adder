<script>
	import { ONE_BTC, btcToUsd } from '$lib/price'
</script>

<div
	on:click={() => btcToUsd.reload()}
	on:keyup={() => btcToUsd.reload()}
	role="button"
	tabindex="-1"
	title="last refreshed: {$btcToUsd.lastRefreshed?.toLocaleTimeString() || 'never'}
click to refresh"
>
	1BTC = {$btcToUsd(ONE_BTC)}
</div>
