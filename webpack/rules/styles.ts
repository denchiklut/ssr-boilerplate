import { cssLoader, miniCssExtractLoader, postCssLoader, sassLoader } from './loaders'

/** css **/
export const cssRule = {
    test: /\.(sa|sc|c)ss$/,
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
        },
        postCssLoader,
        sassLoader
    ]
}
