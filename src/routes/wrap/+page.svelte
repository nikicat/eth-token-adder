<script lang="ts">
	import WrapForm from '$lib/WrapForm.svelte'
	import AddressChecker from '$lib/AddressChecker.svelte'
	import { fixPersisted } from '$lib/utils'
	import type { BtcforwarderAddressInfo } from '$lib/forwarder-api'
	import AddressList from '$lib/AddressList.svelte'

	const addresses = fixPersisted([] as BtcforwarderAddressInfo[], 'forwarder-addresses')
</script>

<WrapForm addresses={addresses} />
<AddressList addresses={addresses} />
<AddressChecker />
