import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config = {
    filename: 'css/[name].css'
}

export const miniCssExtractPlugin = new MiniCssExtractPlugin(config)
