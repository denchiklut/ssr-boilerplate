interface ServiceConfig {
    host: string
    pathPrefix?: string
}

export const EXAMPLE_API: Readonly<'example'> = 'example'

export const services: Record<string, ServiceConfig> = {}
