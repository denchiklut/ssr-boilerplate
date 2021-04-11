import { cssLoader, sassLoader, miniCssExtractLoader, postCssLoader } from './useLoaders'

/** css **/
export const cssRule = {
    test: /\.css$/,
    use: [miniCssExtractLoader, cssLoader].filter(Boolean)
}

/** sass **/
export const sassRule = {
    test: /\.scss$/,
    use: [
        miniCssExtractLoader,
        {
            ...cssLoader,
            options: {
                importLoaders: 2,
                modules: {
                    exportLocalsConvention: 'camelCaseOnly',
                    localIdentName: '[local]__[contenthash:base64:5]'
                }
            }
        },
        postCssLoader,
        sassLoader
    ]
}
