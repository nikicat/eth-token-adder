<script lang="ts">
	// @ts-expect-error
	import { Jazzicon } from 'svelte-ethers-store/components'
	import { Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte'
	import { signer, provider } from '$lib/contracts'
	import EtherscanLink from '$lib/EtherscanLink.svelte'
	import ReloadableCard from '$lib/ReloadableCard.svelte'

	const keyClass = 'px-6 py-4 whitespace-nowrap font-medium text-right'
</script>

<ReloadableCard title="Wallet info" store={signer}>
	<Table>
		<TableBody tableBodyClass="divide-y">
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>Wallet Address</TableBodyCell>
				<TableBodyCell>
					<EtherscanLink type="address" value={$signer.address}>
						<Jazzicon address={$signer.address} />{$signer.address}
					</EtherscanLink>
				</TableBodyCell>
			</TableBodyRow>
			{#await $provider.getNetwork() then network}
				<TableBodyRow>
					<TableBodyCell tdClass={keyClass}>ChainID</TableBodyCell>
					<TableBodyCell>{network.chainId}</TableBodyCell>
				</TableBodyRow>
			{/await}
			{#await $provider.getBalance($signer) then balance}
				<TableBodyRow>
					<TableBodyCell tdClass={keyClass}>Balance</TableBodyCell>
					<TableBodyCell>{balance}</TableBodyCell>
				</TableBodyRow>
			{/await}
		</TableBody>
	</Table>
</ReloadableCard>
