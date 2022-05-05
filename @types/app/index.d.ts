interface Window {
    IS_SERVER: boolean
    IS_DEV: boolean
}

declare namespace Express {
    interface Response {
        renderApp(): void
    }
}

declare module 'require-from-string'
