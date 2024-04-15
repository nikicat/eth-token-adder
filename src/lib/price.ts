import { asyncReadable, type Reloadable } from "@square/svelte-store";

interface BtcToUsd {
    (amount: number): string
    lastRefreshed?: Date
}

export const btcToUsd = asyncReadable((() => "...") as BtcToUsd, async () => {
    const result = await fetch("https://api.yadio.io/convert/1/BTC/USD")
    const rate = (await result.json()).rate
    const f = ((amount: number) => "$" + (amount * rate / ONE_BTC).toFixed(2)) as BtcToUsd
    f.lastRefreshed = new Date()
    return f
}, {reloadable: true}) as Reloadable<BtcToUsd>

export const ONE_BTC = 100_000_000