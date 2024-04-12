<script>
	import '../app.pcss';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<div class="app bg-white dark:bg-slate-800 flex flex-col m-0">
	<Header />

	<main class="flex flex-col flex-1 p-12 items-center gap-4">
		<slot />
	</main>
	<Footer />
</div>

<style>
	div {
		min-height: 100vh;
	}
</style>
