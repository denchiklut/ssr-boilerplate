import { cssLoader, sassLoader, miniCssExtractLoader, postCssLoader } from './useLoaders'

/** css **/
export const cssRule = {
    test: /\.css$/,
    use: [
        miniCssExtractLoader,
        {
            ...cssLoader,
            options: {
                modules: {
                    exportLocalsConvention: 'camelCaseOnly',
                    localIdentName: '[local]__[contenthash:base64:5]'
                }
            }
        }
    ]
}
