import { useState } from 'react'

export const State = () => {
	const [count, setCount] = useState(0)

	return (
		<div>
			<b>HMR Demo</b>
			<p>
				Click Increase button and update the code. You selected state will be preserved with
				HMR update.
			</p>
			<p>count {count}</p>
			<button onClick={() => setCount(count + 1)}>Increase</button>
		</div>
	)
}
