export type Context = {
    headers?: Record<string, string>
}

export function getContext(ctx: Context = {}) {
    const headers = ctx.headers || {}

    return { headers }
}
