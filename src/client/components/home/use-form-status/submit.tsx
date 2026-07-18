'use client'

import { useFormStatus } from 'react-dom'

export const Submit = () => {
	const { data, pending } = useFormStatus()
	const displayName = data?.get('displayName')

	return (
		<>
			<button type='submit' disabled={pending}>
				{pending ? 'Submitting…' : 'Submit'}
			</button>
			{pending && typeof displayName === 'string' && (
				<span> Sending &quot;{displayName}&quot; to the server…</span>
			)}
		</>
	)
}
