<script lang="ts">
	import { Button } from "flowbite-svelte"
</script>

<Button on:click pill={true} outline={true} class="!p-2" {...$$restProps}>
    <slot />
</Button>