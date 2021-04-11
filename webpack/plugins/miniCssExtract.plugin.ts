import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config = {
    filename: 'css/[name].[contenthash].css',
}

export const miniCssExtractPlugin = new MiniCssExtractPlugin(config)
