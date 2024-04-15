<script lang="ts">
	import { RefreshOutline } from "flowbite-svelte-icons"
	import IconButton from "$lib/IconButton.svelte"
</script>

<IconButton on:click {...$$props} >
    <RefreshOutline {...$$props} />
</IconButton>