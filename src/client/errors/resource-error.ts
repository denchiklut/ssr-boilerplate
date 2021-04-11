export class ResourceError extends Error {
    extra: unknown

    constructor(message: string, extra: unknown) {
        super(message)
        this.extra = extra
    }
}
