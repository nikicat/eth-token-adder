<script>
	import { Navbar, NavBrand, NavLi, NavUl } from 'flowbite-svelte'
	import WalletButton from '$lib/WalletButton.svelte'
	import Logo from '$lib/Logo.svelte'
	import BtcPrice from '$lib/BtcPrice.svelte'
	import MempoolLink from '$lib/MempoolLink.svelte'
	import { base } from '$app/paths'
</script>

<Navbar>
	<NavBrand href={base}>
		<Logo class="me-3 h-6 sm:h-9" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			SymBTC UI
		</span>
	</NavBrand>
	<NavUl>
		<NavLi href="{base}/">Info</NavLi>
		<NavLi href="{base}/wrap">Wrap</NavLi>
		<NavLi href="{base}/token-adder">Token Adder</NavLi>
		<NavLi href="{base}/burn">Burn</NavLi>
	</NavUl>
	<div class="flex flex-row items-center gap-16">
		<div>
			<MempoolLink value="" type="" />
			<BtcPrice />
		</div>
		<WalletButton />
	</div>
</Navbar>
