import { useState } from 'react'
import { Button } from '@mui/material'

export const State = () => {
	const [count, setCount] = useState(0)

	return (
		<Button variant='outlined' onClick={() => setCount(count + 1)}>
			Clicked {count}
		</Button>
	)
}
