import { asyncDerived, derived, readable } from '@square/svelte-store'
import { fixPersisted, logged } from '$lib/utils'
import { ethers } from "ethers"
import { SymBtc__factory, SyntERC20__factory, Synthesis__factory } from './symbiosis-contracts-types'

export const browserProvider = readable({} as ethers.BrowserProvider, (set) => {
    if (window.ethereum === null) {
        console.log("MetaMask not installed; using read-only defaults")
    } else {
        set(new ethers.BrowserProvider(window.ethereum))
    }
})

export const provider = derived(browserProvider, ($browserProvider) => {
    if ($browserProvider) {
        console.log("using MetaMask as provider")
        return $browserProvider
    } else {
        console.log("using default read-only provider")
        return ethers.getDefaultProvider()
    }
})
export const symbtcAddress = logged("symbtcAddress", fixPersisted('0x7057aB3fB2BeE9c18e0cDe4240DE4ff7f159E365', 'symbtc-address'))

export const symbtc = derived([provider, symbtcAddress], ([$provider, $symbtcAddress]) => {
    return SymBtc__factory.connect($symbtcAddress, $provider)
})

export const synthesis = asyncDerived([provider, symbtc], async ([$provider, $symbtc]) => {
    const synthesis = await $symbtc.synthesis()
    return Synthesis__factory.connect(synthesis, $provider)
}, {reloadable: true, trackState: true})

export const signer = asyncDerived(browserProvider, async ($browserProvider) => {
    return await $browserProvider?.getSigner()
}, {reloadable: true, trackState: true})

const btcToken = asyncDerived([provider, symbtc], async ([$provider, $symbtc]) => {
    const btcTokenAddress = await $symbtc.getSyntToken()
    return SyntERC20__factory.connect(btcTokenAddress, $provider)
}, {reloadable: true, trackState: true})

export const signerTokenBalance = asyncDerived([btcToken, signer], async ([$btcToken, $signer]) => {
    return await $btcToken.balanceOf($signer)
}, {reloadable: true, trackState: true})