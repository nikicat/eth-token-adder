import { readable, derived, type Readable } from 'svelte/store';
import { defaultEvmStores as evm, contracts } from 'svelte-ethers-store';
import { Contract } from '@ethersproject/contracts';
import { abi as SymBtcAbi } from '$lib/abi/SymBtc.json';
import { type SymBtc } from "$lib/symbiosis-contracts-types/symbiosis-contracts/contracts/periphery/SymBtc";

export const symbtcAddress = '0x7057aB3fB2BeE9c18e0cDe4240DE4ff7f159E365';

export const symbtc: Readable<Promise<SymBtc>> = derived(contracts, async ($contracts: Record<string, Contract>) => {
    if (!$contracts.symbtc)
        await evm.attachContract('symbtc', symbtcAddress, SymBtcAbi as unknown as string);
    return $contracts.symbtc as unknown as SymBtc;
});
