module.exports = api => {
    api.cache(true)

    return {
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        plugins: [
            '@loadable/babel-plugin',
            'react-hot-loader/babel',
            ['@babel/plugin-transform-runtime', { regenerator: true }]
        ]
    }
}
