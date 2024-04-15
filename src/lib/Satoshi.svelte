<script lang="ts">
	import { btcToUsd } from "$lib/price"

    export let value: number | bigint
</script>

<div title={$btcToUsd(Number(value))}>
    {value} sat
</div>