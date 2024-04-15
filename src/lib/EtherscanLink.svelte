<script lang="ts">
	export let value: string;
	export let type: string = "address";
</script>

<a href="https://sepolia.etherscan.io/{type}/{value}" class="block overflow-clip" {...$$restProps}>
	<slot>{value}</slot>
</a>