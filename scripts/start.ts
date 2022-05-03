process.env.NODE_ENV = 'production'

import rimraf from 'rimraf'
import { resolve } from 'path'
import { execSync } from 'child_process'
import webpack, { Configuration } from 'webpack'
import serverConfig from '../webpack/configs/server.config'
import clientConfig from '../webpack/configs/client.config'

console.log('Cleaning dist...')
rimraf.sync('dist')

// building express server
console.log('Building server (express)')
const tscPath = resolve('node_modules/.bin/tsc')
execSync(`${tscPath} --project src/server`)

console.log('building client version')
webpack(
    {
        ...clientConfig,
        mode: 'production',
        context: resolve(__dirname, '..')
    } as Configuration,
    err => {
        if (err) console.error(err)
        console.log('building servered version')
        webpack(
            {
                ...serverConfig,
                mode: 'production',
                context: resolve(__dirname, '..')
            } as Configuration,
            err => {
                if (err) console.error(err)

                // starting server
                const { app } = require('../dist/src/server')
                app.listen(5000, () => {
                    console.log('Application is started on localhost:5000')
                })
            }
        )
    }
)
