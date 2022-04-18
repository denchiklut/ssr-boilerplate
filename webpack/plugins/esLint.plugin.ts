import ESLintPlugin from 'eslint-webpack-plugin'
import { SRC_DIR } from '../env'


const config = {
    context: SRC_DIR,
    extensions: ['js', 'jsx', 'ts', 'tsx']
}

export const esLintPlugin = new ESLintPlugin(config)
