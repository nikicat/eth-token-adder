import { asyncDerived, asyncReadable } from '@square/svelte-store'
import { Api, type BtcforwarderWrapResponse, type HttpResponse, type WebapiResponse } from '$lib/forwarder-api'

//const forwarderApiUrl = "https://relayers.testnet.symbiosis.finance/forwarder/api/v1"
const forwarderApiUrl = "http://localhost:17149/forwarder/api/v1"
const forwarderApi = new Api({baseUrl: forwarderApiUrl})
export const getWrap = forwarderApi.wrap.wrapDetail
export const initiateWrap = forwarderApi.wrap.wrapCreate
export type WrapResponse = HttpResponse<BtcforwarderWrapResponse, WebapiResponse>
export const fetchAddressTxs = forwarderApi.address.addressDetail

const infoResponse = asyncReadable(
    null,
    forwarderApi.info.infoList,
    {reloadable: true},
);

export const info = asyncDerived([infoResponse], async ([resp]) => resp?.data.data)
export const version = asyncDerived([infoResponse], async ([resp]) => resp?.headers.get('App-Version'))
