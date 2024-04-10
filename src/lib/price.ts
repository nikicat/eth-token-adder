import { asyncReadable } from "@square/svelte-store";

export const btcToUsd = asyncReadable(() => "...", async () => {
    const result = await fetch("https://api.yadio.io/convert/1/BTC/USD")
    const rate = (await result.json()).rate
    return (amount: number) => "$" + (amount * rate / ONE_BTC).toFixed(2)
}, {reloadable: true})

export const ONE_BTC = 100_000_000