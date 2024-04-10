<script lang="ts">
	// @ts-expect-error
	import { Balance, Jazzicon } from 'svelte-ethers-store/components';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Card
	} from 'flowbite-svelte';
	import { chainId, signerAddress, defaultEvmStores as evm } from 'svelte-ethers-store';

	const keyClass = 'px-6 py-4 whitespace-nowrap font-medium text-right';
</script>

<Card size="lg">
	<h3>Wallet info</h3>
	<Table>
		<TableBody tableBodyClass="divide-y">
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>Wallet Address</TableBodyCell>
				<TableBodyCell>
					<a
						href="https://sepolia.etherscan.io/address/{$signerAddress}"
						class="flex items-center gap-2"
						target="_blank"
					>
						<Jazzicon address={$signerAddress} />{$signerAddress}</a
					>
				</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>ChainID</TableBodyCell>
				<TableBodyCell>{$chainId}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell tdClass={keyClass}>Balance</TableBodyCell>
				<TableBodyCell><Balance address={$signerAddress} /></TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
</Card>
