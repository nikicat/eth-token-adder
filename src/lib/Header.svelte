<script>
	import { Navbar, NavBrand, NavLi, NavUl } from 'flowbite-svelte'
	import WalletButton from './WalletButton.svelte'
	import Logo from '$lib/Logo.svelte'
	import BtcPrice from '$lib/BtcPrice.svelte'
	import { info } from '$lib/forwarder-store'
	import MempoolLink from './MempoolLink.svelte'
</script>

<Navbar>
	<NavBrand href="https://relayers.testnet.symbiosis.finance/symbtc-ui/">
		<Logo class="me-3 h-6 sm:h-9" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			SymBTC UI
		</span>
	</NavBrand>
	<NavUl>
		<NavLi href="/">Info</NavLi>
		<NavLi href="/wrap">Wrap</NavLi>
		<NavLi href="/token-adder">Token Adder</NavLi>
		<NavLi href="/burn">Burn</NavLi>
	</NavUl>
	<div class="flex flex-row items-center gap-16">
		<div>
			<MempoolLink value="" type="" />
			<BtcPrice />
		</div>
		<WalletButton />
	</div>
</Navbar>
