type Collection<TypeId extends string | number, T> = Record<TypeId, T>

interface Window {
    IS_SERVER: boolean
    IS_DEV: boolean
}

declare namespace Express {
    interface Response {
        renderApp(): void
    }
}
