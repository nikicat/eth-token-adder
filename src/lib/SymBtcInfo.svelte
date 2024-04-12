<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow, Card, Spinner } from 'flowbite-svelte'
	import EtherscanLink from '$lib/EtherscanLink.svelte'
	import { symbtc, signerTokenBalance, btcToken } from '$lib/contracts'
	import Satoshi from '$lib/Satoshi.svelte'

	const keyClass = 'px-6 py-4 whitespace-nowrap font-medium text-right'
</script>

<Card size="lg">
	<h3>SymBTC info</h3>
	<Table>
		<TableBody tableBodyClass="divide-y">
			{#await btcToken.load()}
				<Spinner />
			{:then}
				<TableBodyRow>
					<TableBodyCell tdClass={keyClass}>SymBTC Contract</TableBodyCell>
					<TableBodyCell>
						<EtherscanLink address={$symbtc.address} />
					</TableBodyCell>
				</TableBodyRow>
				{#await $symbtc.bridge() then bridge}
					<TableBodyRow>
						<TableBodyCell tdClass={keyClass}>Bridge contract</TableBodyCell>
						<TableBodyCell>
							<EtherscanLink address={bridge} />
						</TableBodyCell>
					</TableBodyRow>
				{/await}
				{#await $symbtc.synthesis() then synthesis}
					<TableBodyRow>
						<TableBodyCell tdClass={keyClass}>Synthesis contract</TableBodyCell>
						<TableBodyCell><EtherscanLink address={synthesis} /></TableBodyCell>
					</TableBodyRow>
				{/await}
				<TableBodyRow>
					<TableBodyCell tdClass={keyClass}>BTC token</TableBodyCell>
					<TableBodyCell><EtherscanLink address={$btcToken.address} type="token" /></TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell tdClass={keyClass}>BTC token balance</TableBodyCell>
					<TableBodyCell><Satoshi value={$signerTokenBalance} /></TableBodyCell>
				</TableBodyRow>
				{#await $symbtc.getBtcTotalSupply() then totalSupply}
					<TableBodyRow>
						<TableBodyCell tdClass={keyClass}>Total Supply</TableBodyCell>
						<TableBodyCell>{totalSupply} sat</TableBodyCell>
					</TableBodyRow>
				{/await}
				{#await $symbtc.btcChainId() then btcChainId}
					<TableBodyRow>
						<TableBodyCell tdClass={keyClass}>BTC chain ID</TableBodyCell>
						<TableBodyCell>{btcChainId}</TableBodyCell>
					</TableBodyRow>
				{/await}
			{/await}
		</TableBody>
	</Table>
</Card>

<style>
</style>
