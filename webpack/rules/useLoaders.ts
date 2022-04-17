import { join } from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { ROOT_DIR, SRC_DIR } from '../env'

export const cssLoader = {
    loader: 'css-loader'
}

export const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            config: join(ROOT_DIR, 'config/postcss/postcss.js')
        }
    }
}

/**
 * @see https://webpack.js.org/plugins/mini-css-extract-plugin/#root
 */
export const miniCssExtractLoader = {
    loader: MiniCssExtractPlugin.loader
}

/**
 * @see https://webpack.js.org/loaders/sass-loader/#root
 */
export const sassLoader = {
    loader: 'sass-loader',
    options: {
        sassOptions: {
            includePaths: [join(SRC_DIR, 'client/styles')]
        }
    }
}

export const babelLoader = {
    loader: 'babel-loader'
}
