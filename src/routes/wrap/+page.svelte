<script lang="ts">
	import WrapForm from '$lib/WrapForm.svelte'
	import AddressChecker from '$lib/AddressChecker.svelte'
	import { fixPersisted } from '$lib/utils'
	import type { BtcforwarderAddressInfo } from '$lib/forwarder-api'
	import AddressList from '$lib/AddressList.svelte'
	import { signer } from '$lib/contracts'

	const addresses = fixPersisted([] as BtcforwarderAddressInfo[], 'forwarder-addresses')
</script>

{#await signer.load() then}
	<WrapForm {addresses} to={$signer?.address} />
{/await}
<AddressList {addresses} />
<AddressChecker />
