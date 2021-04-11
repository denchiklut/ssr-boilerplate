import CircularDependencyPlugin from 'circular-dependency-plugin'

const config = {
    exclude: /a\.js|node_modules/, // exclude node_modules
    failOnError: false // show a warning when there is a circular dependency
}

export const circularDependency = new CircularDependencyPlugin(config)
