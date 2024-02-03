import { useEffect, useState } from 'react'

export const useMounted = () => {
	const [isMounted, setMount] = useState(false)

	useEffect(() => {
		setMount(true)
	}, [])

	return isMounted
}
