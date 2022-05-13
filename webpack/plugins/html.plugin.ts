import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { SRC_DIR } from '../env'

export const htmlWebpackPlugin = new HtmlWebpackPlugin({
	filename: 'index.html',
	inject: true,
	template: join(SRC_DIR, 'client/assets/index.html')
})
