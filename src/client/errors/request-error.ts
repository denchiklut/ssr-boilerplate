export class RequestError extends Error {
    message: string
    data: unknown

    constructor(message: string, data: unknown) {
        super('request error')
        this.message = message
        this.data = data
    }
}
