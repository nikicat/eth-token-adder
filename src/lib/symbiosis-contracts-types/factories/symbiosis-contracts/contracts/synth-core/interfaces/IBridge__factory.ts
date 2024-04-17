/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IBridge,
  IBridgeInterface,
} from "../../../../../symbiosis-contracts/contracts/synth-core/interfaces/IBridge";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_callData",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_receiveSide",
        type: "address",
      },
    ],
    name: "receiveRequestV2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_to",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "BtcSerial",
        name: "_burnSerial",
        type: "uint64",
      },
    ],
    name: "transmitRequestBTC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_callData",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_receiveSide",
        type: "address",
      },
      {
        internalType: "address",
        name: "_oppositeBridge",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
    ],
    name: "transmitRequestV2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IBridge__factory {
  static readonly abi = _abi;
  static createInterface(): IBridgeInterface {
    return new Interface(_abi) as IBridgeInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IBridge {
    return new Contract(address, _abi, runner) as unknown as IBridge;
  }
}
