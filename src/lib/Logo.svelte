<script lang="ts">
	import symbiosis from '$lib/images/symbiosis.svg'
	import bitcoin from '$lib/images/bitcoin.svg'
</script>

<div {...$$props}>
	<img src={symbiosis} alt="Symbiosis" class="octopus "/>
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
	
	.octopus {
		border-radius: 50%;
		clip-path: polygon(0 0, 0 100%, 100% 0);
	}

	.bitcoin {
		width: 100%;
		position: absolute;
		bottom: 0%;
		right: 0%;
		clip-path: polygon(0 100%, 100% 0, 100% 100%);
	}
</style>
