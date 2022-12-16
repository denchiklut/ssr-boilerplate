import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { ROOT_DIR } from '../env'

export const htmlWebpackPlugin = new HtmlWebpackPlugin({
	filename: 'index.html',
	inject: true,
	template: join(ROOT_DIR, 'assets/spa/index.html')
})
