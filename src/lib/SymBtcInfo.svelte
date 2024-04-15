<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte'
	import EtherscanLink from '$lib/EtherscanLink.svelte'
	import { symbtc, signerTokenBalance } from '$lib/contracts'
	import Satoshi from '$lib/Satoshi.svelte'
	import ReloadableCard from '$lib/ReloadableCard.svelte'
	import { asyncDerived } from '@square/svelte-store'

	const keyClass = 'px-6 py-4 whitespace-nowrap font-medium text-right'
</script>

<ReloadableCard
	title="SymBTC info"
	store={asyncDerived([symbtc, signerTokenBalance], async () => {})}
>
	<Table>
		<TableBody tableBodyClass="divide-y">
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>SymBTC Contract</TableBodyCell>
				<TableBodyCell>
					{#await $symbtc.getAddress() then address}
						<EtherscanLink value={address} />
					{/await}
				</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>Bridge contract</TableBodyCell>
				<TableBodyCell>
					{#await $symbtc.bridge() then bridge}
						<EtherscanLink value={bridge} />
					{/await}
				</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>Synthesis contract</TableBodyCell>
				<TableBodyCell>
					{#await $symbtc.synthesis() then synthesis}
						<EtherscanLink value={synthesis} />
					{/await}
				</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>BTC token</TableBodyCell>
				<TableBodyCell>
					{#await $symbtc.btcTokenAddress() then address}
						<EtherscanLink value={address} type="token" />
					{/await}
				</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>BTC token balance</TableBodyCell>
				<TableBodyCell><Satoshi value={$signerTokenBalance} /></TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>Total Supply</TableBodyCell>
				{#await $symbtc.getBtcTotalSupply() then totalSupply}
					<TableBodyCell>{totalSupply} sat</TableBodyCell>
				{/await}
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>BTC chain ID</TableBodyCell>
				{#await $symbtc.btcChainId() then btcChainId}
					<TableBodyCell>{btcChainId}</TableBodyCell>
				{/await}
			</TableBodyRow>
		</TableBody>
	</Table>
</ReloadableCard>

<style>
</style>
