type Collection<TypeId extends string | number, T> = Record<TypeId, T>


interface Window {
    __INITIAL_STATE__: never
    IS_SERVER: boolean
    IS_DEV: boolean
}

declare namespace Express {
    interface Response {
        renderApp(): void
    }
}
