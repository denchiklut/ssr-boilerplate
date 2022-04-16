import { join } from 'path'
import { rootDir } from './env'

export const alias = {
    '@shared': join(rootDir, 'src/client/components/@shared'),
    config: join(rootDir, 'config'),
    src: join(rootDir, 'src'),
    errors: join(rootDir, 'src/client/errors'),
    server: join(rootDir, 'src/server'),
    client: join(rootDir, 'src/client'),
    components: join(rootDir, 'src/client/components'),
    pages: join(rootDir, 'src/client/pages'),
    assets: join(rootDir, 'src/client/assets'),
    utils: join(rootDir, 'src/client/utils')
}
