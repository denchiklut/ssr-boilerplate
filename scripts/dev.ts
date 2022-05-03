process.env.NODE_ENV = 'development'

import rimraf from 'rimraf'
import { resolve } from 'path'
import { execSync } from 'child_process'
import webpack, { Configuration } from 'webpack'
import serverConfig from '../webpack/configs/server.config'
import clientConfig from '../webpack/configs/client.config'

console.log('cleaning dist...')
rimraf.sync('dist')

console.log('building server express')
const tscPath = resolve('node_modules/.bin/tsc')
execSync(`${tscPath} --project src/server`)

console.log('building client')
webpack(
    {
        ...clientConfig,
        mode: 'development',
        context: resolve(__dirname, '..')
    } as Configuration,
    err => {
        if (err) console.error(err)
    }
)

console.log('watching react server updates')
webpack(
    {
        ...serverConfig,
        watch: true,
        mode: 'development',
        context: resolve(__dirname, '..')
    } as Configuration,
    err => {
        if (err) console.error(err)
    }
)

// starting server
const { app } = require('../dist/src/server')
app.listen(5000, () => {
    console.log('Application is started on localhost:5000')
})
