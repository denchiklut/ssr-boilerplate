import { Home } from 'components/home'
import { getEnv } from 'src/common'

export default () => {
	try {
		console.log('))', getEnv('NEXT_PUBLIC_TEST'))
	} catch (err) {
		console.log('((', err)
	}
	return <Home />
}
