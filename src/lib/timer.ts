import { readable, derived } from 'svelte/store'

function now(): Date {
    return new Date()
}

export function toString(duration: number) {
    const date = new Date(0);
    date.setUTCMilliseconds(duration);
    return date.toISOString().substring(11, 19);
}

// Return number of milliseconds until `until`
function left(until: Date): number {
    return until.valueOf() - now().valueOf()
}

export function timer(until: Date, options?: { interval: number }) {
    return readable(left(until), set => {
        // the update function sets the latest date
        const update = () => set(left(until))
        // setup an interval timer to update the store's value repeatedly over time
        const interval = setInterval(update, options?.interval || 1000)
        // return unsubscribe callback:
        // it will stop the timer when the store is destroyed
        return () => clearInterval(interval)
    })
}

export function stringTimer(until: Date, options?: { interval: number }) {
    return derived(timer(until, options), ($left) => {
        return toString($left)
    })
}