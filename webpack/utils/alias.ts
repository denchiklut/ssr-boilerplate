import { join } from 'path'
import { rootDir } from './env'

export const alias = {
    '@shared': join(rootDir, 'src/client/components/@shared'),
    config: join(rootDir, 'config'),
    src: join(rootDir, 'src'),
    errors: join(rootDir, 'src/client/errors'),
    server: join(rootDir, 'src/server'),
    client: join(rootDir, 'src/client'),
    store: join(rootDir, 'src/client/store'),
    components: join(rootDir, 'src/client/components'),
    pages: join(rootDir, 'src/client/pages'),
    resources: join(rootDir, 'src/client/resources'),
    api: join(rootDir, 'src/client/resources/api'),
    schemas: join(rootDir, 'src/client/resources/schemas'),
    assets: join(rootDir, 'src/client/assets'),
    utils: join(rootDir, 'src/client/utils')
}
