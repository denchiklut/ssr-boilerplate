export class ResponseError extends Error {
    url: string
    method: string
    errors: unknown

    constructor(url: string, method: string, errors: unknown) {
        super('response error')
        this.url = url
        this.method = method
        this.errors = errors
    }
}
