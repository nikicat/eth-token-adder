<script lang="ts">
	import { Label } from "flowbite-svelte"

    export let label: string
</script>

<div class="w-full mt-2 text-gray-900 dark:text-gray-200">
	<Label>{label}</Label>
	<slot />
</div>