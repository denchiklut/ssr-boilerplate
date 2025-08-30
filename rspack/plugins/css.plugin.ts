import { CssExtractRspackPlugin } from '@rspack/core'

import { IS_DEV } from '../env'

export const css = new CssExtractRspackPlugin({
	filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash].css'
})
