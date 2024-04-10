<script lang="ts">
	export let address: string;
	export let type: string = "address";
</script>

<a href="https://sepolia.etherscan.io/{type}/{address}" class="font-mono" {...$$restProps}>{address}</a>