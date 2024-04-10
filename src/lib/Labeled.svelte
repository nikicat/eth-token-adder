<script lang="ts">
	import { Label } from "flowbite-svelte"

    export let label: string
</script>

<div class="w-full">
	<Label>{label}</Label>
	<slot />
</div>