<script lang="ts">
	import { Card } from 'flowbite-svelte'

	export let title: string = ""
	export let class_: string = ""
</script>

<Card size="lg" class={"flex flex-col items-center " + class_} {...$$restProps}>
	<h3 class="flex w-full flex-row items-center justify-between pb-6 text-xl">
		<slot name="title">
			{title}
		</slot>
	</h3>
	<slot />
</Card>
