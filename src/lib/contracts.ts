import { defaultEvmStores as evm, contracts as evmContracts, signerAddress, connected } from 'svelte-ethers-store'
import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json'
import { asyncDerived } from '@square/svelte-store'
import { abi as SymBtcAbi } from '$lib/abi/SymBtc.json'
import { abi as SynthesisAbi } from '$lib/abi/Synthesis.json'
import { type SymBtc } from "$lib/symbiosis-contracts-types/symbiosis-contracts/contracts/periphery/SymBtc"
import { type SyntERC20 } from "$lib/symbiosis-contracts-types/symbiosis-contracts/contracts/synth-core/SyntERC20"
import { type Synthesis } from "$lib/symbiosis-contracts-types/symbiosis-contracts/contracts/synth-core/Synthesis"
import { fixPersisted, logged } from '$lib/utils'

const contracts = logged("contracts", asyncDerived(evmContracts, async $contracts => {
    await evm.setProvider()
    return $contracts
}))

export const symbtcAddress = logged("symbtcAddress", fixPersisted('0x7057aB3fB2BeE9c18e0cDe4240DE4ff7f159E365', 'symbtc-address'))

export const symbtc = logged("symbtc", asyncDerived([contracts, symbtcAddress, connected], async ([$contracts, $symbtcAddress]) => {
    if (!$contracts.symbtc)
        await evm.attachContract('symbtc', $symbtcAddress, SymBtcAbi as unknown as string)
    return $contracts.symbtc as unknown as SymBtc;
}))

export const btcToken = logged("btcToken", asyncDerived([contracts, symbtc], async ([$contracts, $symbtc]) => {
    if (!$contracts.btcToken) {
        const btcTokenAddress = await $symbtc.getSyntToken()
        await evm.attachContract('btcToken', btcTokenAddress, IERC20.abi as unknown as string)
    }
    return $contracts.btcToken as unknown as SyntERC20
}))

export const synthesis = asyncDerived([contracts, symbtc], async ([$contracts, $symbtc]) => {
    if (!$contracts.btcToken) {
        const synthesis = await $symbtc.synthesis()
        await evm.attachContract('synthesis', synthesis, SynthesisAbi as unknown as string)
    }
    return $contracts.synthesis as unknown as Synthesis
})

export const signerTokenBalance = asyncDerived([btcToken, signerAddress], async ([$btcToken, $signerAddress]) => {
    return Number(await $btcToken.balanceOf($signerAddress))
})