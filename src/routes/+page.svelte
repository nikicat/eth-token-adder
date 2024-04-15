<script>
	import PortalInfo from '$lib/PortalInfo.svelte'
	import SymBtcInfo from '$lib/SymBtcInfo.svelte'
	import UnwrapLog from '$lib/UnwrapLog.svelte'
	import WalletInfo from '$lib/WalletInfo.svelte'
</script>

<svelte:head>
	<title>SymBTC bridge</title>
	<meta name="description" content="SymBTC bridge" />
</svelte:head>

<section class="flex flex-col items-center gap-8">
	<PortalInfo />
	<WalletInfo />
	<SymBtcInfo />
</section>

<style>
</style>
