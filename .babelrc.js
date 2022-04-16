module.exports = api => {
    api.cache(true)

    return {
        presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic'
                }
            ]
        ],
        plugins: ['@loadable/babel-plugin', ['@babel/plugin-transform-runtime', { regenerator: true }]]
    }
}
