import { persisted, type Writable, type Readable, type Loadable, type Subscriber } from "@square/svelte-store"

export function fixPersisted<T>(initial: T, key: string): Writable<T> {
    const store = persisted(initial, key)
    return {
        subscribe: (run: (value: T) => void, invalidate?) => {
            return store.subscribe((value: T) => {
                if (value !== undefined) {
                    run(value)
                } else {
                    run(initial)
                }
            }, invalidate)
        },
        set: store.set,
        update: store.update,
    }
}

export function logged<T, S extends Readable<T> | Loadable<T>>(name: string, store: S): S {
    let subscribed = false
    return {
        ...store,
        subscribe: (run: Subscriber<T>) => {
            if (!subscribed) {
                store.subscribe(v => console.log("updated", name, v))
                subscribed = true
            }
            return store.subscribe(run)
        }
    }
}