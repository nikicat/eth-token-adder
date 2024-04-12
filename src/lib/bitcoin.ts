import {networks, address} from 'bitcoinjs-lib'

export function getPkScript(addr: string, chain: string): Buffer {
    const network = {
        "mainnet": networks.bitcoin,
        "testnet3": networks.testnet,
    }[chain]
    return address.toOutputScript(addr, network);
}