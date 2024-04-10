<script lang="ts">
	import { defaultEvmStores as evm, contracts, signerAddress } from 'svelte-ethers-store'
	import { Table, TableBody, TableBodyCell, TableBodyRow, Card } from 'flowbite-svelte'
	import EtherscanLink from '$lib/EtherscanLink.svelte'
	import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json'
	import { symbtc, symbtcAddress } from '$lib/contracts'
	import Satoshi from '$lib/Satoshi.svelte'

	const keyClass = 'px-6 py-4 whitespace-nowrap font-medium text-right'

	async function getTokenBalance(token: string): Promise<number | null> {
		if (!$contracts.btcToken)
			await evm.attachContract('btcToken', token, IERC20.abi as unknown as string)
		return await $contracts.btcToken.balanceOf($signerAddress)
	}
</script>

<Card size="lg">
	<h3>SymBTC info</h3>
	<Table>
		<TableBody tableBodyClass="divide-y">
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>SymBTC Contract</TableBodyCell>
				<TableBodyCell>
					<EtherscanLink address={symbtcAddress} />
				</TableBodyCell>
			</TableBodyRow>
			{#await $symbtc then sbtc}
				{#await sbtc.bridge() then bridge}
					<TableBodyRow>
						<TableBodyCell tdClass={keyClass}>Bridge contract</TableBodyCell>
						<TableBodyCell>
							<EtherscanLink address={bridge} />
						</TableBodyCell>
					</TableBodyRow>
				{/await}
				{#await sbtc.synthesis() then synthesis}
					<TableBodyRow>
						<TableBodyCell tdClass={keyClass}>Synthesis contract</TableBodyCell>
						<TableBodyCell><EtherscanLink address={synthesis} /></TableBodyCell>
					</TableBodyRow>
				{/await}
				{#await sbtc.getSyntToken() then token}
					<TableBodyRow>
						<TableBodyCell tdClass={keyClass}>BTC token</TableBodyCell>
						<TableBodyCell><EtherscanLink address={token} type="token" /></TableBodyCell>
					</TableBodyRow>
					{#await getTokenBalance(token) then balance}
						{#if balance}
							<TableBodyRow>
								<TableBodyCell tdClass={keyClass}>BTC token balance</TableBodyCell>
								<TableBodyCell><Satoshi value={balance} /></TableBodyCell>
							</TableBodyRow>
						{/if}
					{/await}
				{/await}
				{#await sbtc.getBtcTotalSupply() then value}
					<TableBodyRow>
						<TableBodyCell tdClass={keyClass}>Total Supply</TableBodyCell>
						<TableBodyCell>{value} sat</TableBodyCell>
					</TableBodyRow>
				{/await}
				{#await sbtc.btcChainId() then btcChainId}
					<TableBodyRow>
						<TableBodyCell tdClass={keyClass}>BTC chain ID</TableBodyCell>
						<TableBodyCell>{btcChainId}</TableBodyCell>
					</TableBodyRow>
				{/await}
				{#await sbtc.btcTokenAddress() then syntToken}
					<TableBodyRow>
						<TableBodyCell tdClass={keyClass}>Synthetic token</TableBodyCell>
						<TableBodyCell><EtherscanLink address={syntToken} type="token" /></TableBodyCell>
					</TableBodyRow>
				{/await}
			{/await}
		</TableBody>
	</Table>
</Card>

<style>
</style>
