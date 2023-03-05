import { useState } from 'react'
import { getDebugger, getEnvVars } from 'src/common'
import css from './styles.scss'

const debug = getDebugger('component: Home')
export const Home = () => {
	const [count, setCount] = useState(0)
	const exampleHost = getEnvVars('EXAMPLE_HOST')
	debug('example host %s', exampleHost)

	return (
		<div className={css.wrapper}>
			<h3>Home page!</h3>
			<p>count {count}</p>
			<button onClick={() => setCount(count + 1)}>Increase</button>
		</div>
	)
}
