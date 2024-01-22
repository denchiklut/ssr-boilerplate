import { useState } from 'react'

export const useToggle = (initial?: boolean) => {
	const [isOpen, setIsOpen] = useState(initial ?? false)

	const toggle = (newValue?: unknown) => {
		if (typeof newValue === 'boolean') return setIsOpen(newValue)

		setIsOpen(prev => !prev)
	}

	return [isOpen, toggle] as const
}
