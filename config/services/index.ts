interface ServiceConfig {
    host: string
    pathPrefix?: string
}

export const EXAMPLE_API: Readonly<'example'> = 'example'

export const services: Collection<string, ServiceConfig> = {
    [EXAMPLE_API]: {
        host: 'https://jsonplaceholder.typicode.com',
        pathPrefix: ''
    }
}
