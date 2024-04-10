/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BtcforwarderAddressInfo {
	commitFee: number
	info: BtcproviderDepositInfoInscription
	legacyAddress: string
	revealAddress: string
	revealFeeLimit: number
	validUntil: string
}

export interface BtcforwarderAddressInfoResponse {
	data: BtcforwarderAddressInfoResponseData
	message: string
}

export interface BtcforwarderAddressInfoResponseData {
	addressInfo: BtcforwarderAddressInfo
	transactions: BtcforwarderTransactionInfo[]
}

export interface BtcforwarderInfoResponse {
	data: BtcforwarderInfoResponseData
	message: string
}

export interface BtcforwarderInfoResponseData {
	btcPortalAddress: string
	chain: string
	txListener: BtcforwarderTxListenerInfo
}

export interface BtcforwarderPortalInfoResponse {
	finalizedState: TypesBtcStateInfo
	pendingState: TypesBtcStateInfo
	portal: TypesBtcPortalInfo
}

export interface BtcforwarderTransactionInfo {
	commitOutputIdx: number
	commitTx: string
	incomeOutputTx?: number
	incomeTx?: string
	revealTx?: string
}

export interface BtcforwarderTxInfoResponse {
	data: BtcforwarderTxInfoResponseData
	message: string
}

export interface BtcforwarderTxInfoResponseData {
	addressInfo: BtcforwarderAddressInfo
	txInfo: BtcforwarderTransactionInfo
	wrapInfo: TypesBtcWrap
}

export interface BtcforwarderTxListenerInfo {
	btcPortal: TypesBtcPortalInfo
}

export interface BtcforwarderUnwrapInfoResponse {
	data: BtcforwarderUnwrapInfoResponseData
	message: string
}

export interface BtcforwarderUnwrapInfoResponseData {
	unwrapInfo: TypesUnwrapInfo
}

export interface BtcforwarderWrapRequest {
	/** TODO: remove this field and apply RevealFeeLimit to both txs */
	commitFee: number
	info: BtcproviderDepositInfoInscription
	/** fee for reveal transaction */
	revealFeeLimit: number
}

export interface BtcforwarderWrapResponse {
	data: BtcforwarderAddressInfo
	message: string
}

export interface BtcproviderDepositInfoInscription {
	/** BTC base fee */
	fee?: number
	/** Type of operation */
	op?: BtcproviderOperation
	/** Fee for bridging */
	sbfee?: number
	/**
	 * Result of SymBtc.getBTCCalldata()
	 * @format base64
	 */
	tail?: string
	/** Receiver address */
	to: string
}

export enum BtcproviderOperation {
	OpWrap = 0,
	OpFee = 1,
}

export interface TypesBtcDepositInfo {
	blockHash: string
	outputIdx?: number
	txId: string
	value?: number
	wrap: TypesWrapInfo
}

export interface TypesBtcPortalInfo {
	genesisTx: string
	genesisTxBlock: string
}

export interface TypesBtcStateInfo {
	address: string
	feeLocked: number
	lastBlock: string
	lastTxId: string
	minBtcFee: number
	serial: number
	totalLocked: number
	unconsolidated: TypesBtcDepositInfo[]
	unwraps: TypesUnwrapInfo[]
	wraps: TypesWrapInfo[]
}

export interface TypesBtcWrap {
	/** Both fees will be deducted from the Value (i.e. amount should be greater than fees combined) */
	btcFee: number
	/** Index of reveal tx input with this wrap */
	revealInputIdx: number
	/** ID (Hash) of Bitcoin reveal transaction that initiated wrap */
	revealTx: string
	serial: number
	/** Fee for bridging */
	stableBridgingFee: number
	/** @format base64 */
	tail: string
	/** EVM address that receives wrapped BTC */
	to: string
	/** Wrap value in Satoshis */
	value: number
}

export interface TypesUnwrapInfo {
	serial: number
	to: string
	tx: string
	value: number
}

export interface TypesWrapInfo {
	revealInputIdx: number
	revealTxHash: string
	to: string
	value: number
}

export interface WebapiResponse {
	message: string
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean
	/** request path */
	path: string
	/** content type of request body */
	type?: ContentType
	/** query params */
	query?: QueryParamsType
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat
	/** request body */
	body?: unknown
	/** base url */
	baseUrl?: string
	/** request cancellation token */
	cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
	securityWorker?: (
		securityData: SecurityDataType | null
	) => Promise<RequestParams | void> | RequestParams | void
	customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
	data: D
	error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = '/forwarder/api/v1'
	private securityData: SecurityDataType | null = null
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
	private abortControllers = new Map<CancelToken, AbortController>()
	private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

	private baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig)
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data
	}

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key)
		return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key])
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key]
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {}
		const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
		return keys
			.map((key) =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key)
			)
			.join('&')
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery)
		return queryString ? `?${queryString}` : ''
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === 'object' || typeof input === 'string')
				? JSON.stringify(input)
				: input,
		[ContentType.Text]: (input: any) =>
			input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key]
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
						? JSON.stringify(property)
						: `${property}`
				)
				return formData
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	}

	protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		}
	}

	protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken)
			if (abortController) {
				return abortController.signal
			}
			return void 0
		}

		const abortController = new AbortController()
		this.abortControllers.set(cancelToken, abortController)
		return abortController.signal
	}

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken)

		if (abortController) {
			abortController.abort()
			this.abortControllers.delete(cancelToken)
		}
	}

	public request = async <T = any, E = any>(
		{ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams
	): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{}
		const requestParams = this.mergeRequestParams(params, secureParams)
		const queryString = query && this.toQueryString(query)
		const payloadFormatter = this.contentFormatters[type || ContentType.Json]
		const responseFormat = format || requestParams.format

		return this.customFetch(
			`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
			{
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
				},
				signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
				body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
			}
		).then(async (response) => {
			const r = response as HttpResponse<T, E>
			r.data = null as unknown as T
			r.error = null as unknown as E

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = data
							} else {
								r.error = data
							}
							return r
						})
						.catch((e) => {
							r.error = e
							return r
						})

			if (cancelToken) {
				this.abortControllers.delete(cancelToken)
			}

			if (!response.ok) throw data
			return data
		})
	}
}

/**
 * @title Symbiosis BTC forwarder API
 * @version 1.0
 * @termsOfService https://old.symbiosis.finance/terms
 * @baseUrl /forwarder/api/v1
 * @contact
 *
 * This API allows to deposit BTC to Symbiosis bridge to wrap it
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	address = {
		/**
		 * @description Returns address info and a list of transactions to it
		 *
		 * @name AddressDetail
		 * @summary Get address info
		 * @request GET:/address/{address}
		 */
		addressDetail: (address: string, params: RequestParams = {}) =>
			this.request<BtcforwarderAddressInfoResponse, WebapiResponse>({
				path: `/address/${address}`,
				method: 'GET',
				type: ContentType.Json,
				format: 'json',
				...params,
			}),
	}
	info = {
		/**
		 * @description Returns info about this forwarder instance
		 *
		 * @name InfoList
		 * @summary Get service info
		 * @request GET:/info
		 */
		infoList: (params: RequestParams = {}) =>
			this.request<BtcforwarderInfoResponse, WebapiResponse>({
				path: `/info`,
				method: 'GET',
				type: ContentType.Json,
				format: 'json',
				...params,
			}),
	}
	portal = {
		/**
		 * @description Returns info about the BTC Portal state
		 *
		 * @name PortalList
		 * @summary Get BTC Portal info
		 * @request GET:/portal
		 */
		portalList: (params: RequestParams = {}) =>
			this.request<BtcforwarderPortalInfoResponse, WebapiResponse>({
				path: `/portal`,
				method: 'GET',
				type: ContentType.Json,
				format: 'json',
				...params,
			}),
	}
	unwrap = {
		/**
		 * @description Returns info about the unwrap
		 *
		 * @name UnwrapDetail
		 * @summary Get unwrap info
		 * @request GET:/unwrap/{serial}
		 */
		unwrapDetail: (serial: number, params: RequestParams = {}) =>
			this.request<BtcforwarderUnwrapInfoResponse, WebapiResponse>({
				path: `/unwrap/${serial}`,
				method: 'GET',
				type: ContentType.Json,
				format: 'json',
				...params,
			}),
	}
	wrap = {
		/**
		 * @description Forward BTC for wrapping using Symbiosis bridge
		 *
		 * @name WrapCreate
		 * @summary Wrap BTC
		 * @request POST:/wrap
		 */
		wrapCreate: (request: BtcforwarderWrapRequest, params: RequestParams = {}) =>
			this.request<BtcforwarderWrapResponse, WebapiResponse>({
				path: `/wrap`,
				method: 'POST',
				body: request,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * @description Returns info about the forwarded tx
		 *
		 * @name WrapDetail
		 * @summary Get forwarded tx info
		 * @request GET:/wrap/{txid}
		 */
		wrapDetail: (txid: string, params: RequestParams = {}) =>
			this.request<BtcforwarderTxInfoResponse, WebapiResponse>({
				path: `/wrap/${txid}`,
				method: 'GET',
				type: ContentType.Json,
				format: 'json',
				...params,
			}),
	}
}
