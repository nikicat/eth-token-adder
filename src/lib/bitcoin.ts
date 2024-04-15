import { networks, address } from 'bitcoinjs-lib'

function getNetwork(chain: string): networks.Network | undefined {
    return {
        "mainnet": networks.bitcoin,
        "testnet3": networks.testnet,
    }[chain]
}

export function getPkScript(addr: string, chain: string): Buffer {
    return address.toOutputScript(addr, getNetwork(chain));
}

export function getAddress(pkScript: string, chain: string): string {
    return address.fromOutputScript(Buffer.from(pkScript.substring(2), 'hex'), getNetwork(chain))
}