<script lang="ts">
	import { provider } from 'svelte-ethers-store';
	import { Provider } from '@ethersproject/providers';

	interface ProviderWithSend extends Provider {
		send(method: string, args: any): Promise<any>;
	}

	let tokenAddress: string = '0xF0CB8795274ca3b22e175283E2e07951Ccaf3BEF';
	let tokenImage: string;
	let error: { code: string; message: string; stack: string };

	async function addToken() {
		try {
			const wasAdded = await ($provider as ProviderWithSend).send('wallet_watchAsset', {
				type: 'ERC20',
				options: {
					address: tokenAddress,
					image: tokenImage
				}
			});

			if (wasAdded) {
				console.log(`Thanks for your interest!`);
			} else {
				console.log(`Your loss!`);
			}
		} catch (exc) {
			console.log('exc', exc);
			error = exc as { code: string; message: string; stack: string };
		}
	}

	function onImageChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target?.files?.[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			tokenImage = reader.result as string;
		};

		if (file) {
			reader.readAsDataURL(file);
		} else {
			tokenImage = '';
		}
	}
</script>

<div class="form">
	<label>
		Token Address
		<input type="text" bind:value={tokenAddress} placeholder="Token Address" />
	</label>
	<label>
		Token Logo URL/File
		<input type="file" on:change={onImageChange} />
		<input type="text" bind:value={tokenImage} placeholder="Logo URL" />
	</label>
	<img src={tokenImage} alt="Token Logo" />
	<button on:click={addToken}>Add to Metamask</button>
</div>
{#if error}
	<div>
		<p>{error.code}: {error.message}</p>
		<pre>{error.stack}</pre>
	</div>
{/if}

<style>
	div.form {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
	img {
		width: 10em;
	}
	pre {
		font-size: small;
		line-height: 2em;
		background-color: black;
		color: darkgreen;
	}
</style>
