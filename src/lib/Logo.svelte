<script lang="ts">
	import symbiosis from '$lib/images/symbiosis.svg'
	import bitcoin from '$lib/images/bitcoin.svg'
</script>

<div {...$$props}>
	<img src={symbiosis} alt="Symbiosis" />
	<img src={bitcoin} alt="bitcoin" class="bitcoin" />
</div>

<style>
	div {
		position: relative;
		width: 100%;
		max-width: 640px;
		line-height: 0;
	}

	div img {
		max-width: 100%;
	}

	.bitcoin {
		width: 50%;
		position: absolute;
		bottom: 0%;
		right: 0%;
	}
</style>
