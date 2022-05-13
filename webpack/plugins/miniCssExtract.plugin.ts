import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { IS_DEV } from '../env'

const config = {
	filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash].css'
}

export const miniCssExtractPlugin = new MiniCssExtractPlugin(config)
