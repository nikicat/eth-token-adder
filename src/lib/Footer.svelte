<script lang="ts">
	import { Footer, FooterIcon } from 'flowbite-svelte'
	import { GithubSolid } from 'flowbite-svelte-icons'
	import Version from '$lib/Version.svelte'
</script>

<Footer class="min-h-12 p-4 sm:flex sm:items-center sm:justify-between" footerType="socialmedia">
	<Version />
	<a href="https://bitcoinfaucet.uo1.net/">Faucet</a>
	<FooterIcon href="https://github.com/symbiosis-finance/btc-relayer" target=_blank>
		<GithubSolid
			class="text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
		/>
	</FooterIcon>
</Footer>
