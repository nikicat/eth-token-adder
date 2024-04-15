import { asyncDerived, persisted, derived } from '@square/svelte-store'
import { Api, type BtcforwarderWrapResponse, type HttpResponse, type WebapiResponse } from '$lib/forwarder-api'

const forwarderApiUrl = persisted("/forwarder/api/v1", "forwarder-api-url")
const forwarderApi = derived(forwarderApiUrl, $forwarderApiUrl => new Api({ baseUrl: $forwarderApiUrl }))
export const getWrap = derived(forwarderApi, $forwarderApi => $forwarderApi.wrap.wrapDetail)
export const initiateWrap = derived(forwarderApi, $forwarderApi => $forwarderApi.wrap.wrapCreate)
export type WrapResponse = HttpResponse<BtcforwarderWrapResponse, WebapiResponse>
export const fetchAddressTxs = derived(forwarderApi, $forwarderApi => $forwarderApi.address.addressDetail)

const infoResponse = asyncDerived(
    forwarderApi,
    $forwarderApi => $forwarderApi.info.infoList(),
    { reloadable: true, trackState: true },
);

export const info = asyncDerived(infoResponse, async resp => resp?.data.data, { reloadable: true, trackState: true })
export const version = asyncDerived(infoResponse, async resp => resp?.headers.get('App-Version'), { reloadable: true, trackState: true })
