import { useState } from 'react'

export const State = () => {
	const [count, setCount] = useState(0)

	return (
		<>
			<p>count {count}</p>
			<button onClick={() => setCount(count + 1)}>Increase</button>
		</>
	)
}
