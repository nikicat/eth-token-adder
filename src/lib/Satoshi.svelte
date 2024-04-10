<script lang="ts">
	import { btcToUsd } from "$lib/price"

    export let value: number
</script>

<div title={$btcToUsd(value)}>
    {value} sat
</div>