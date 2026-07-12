'use client'

import { useState, useTransition } from 'react'

import { createServerGreeting } from './actions'

export const UseServerDemo = () => {
	const [name, setName] = useState('Rspack user')
	const [message, setMessage] = useState('')
	const [isPending, startTransition] = useTransition()

	const callServer = () => {
		startTransition(async () => {
			try {
				setMessage(await createServerGreeting(name))
			} catch {
				setMessage('The server could not create a greeting.')
			}
		})
	}

	return (
		<div>
			<b>&apos;use server&apos; demo</b>
			<p>This client component calls a Server Function directly, outside a form.</p>
			<label>
				Name:{' '}
				<input
					value={name}
					maxLength={50}
					onChange={event => setName(event.currentTarget.value)}
				/>
			</label>{' '}
			<button type='button' disabled={isPending || !name.trim()} onClick={callServer}>
				{isPending ? 'Calling server…' : 'Create server greeting'}
			</button>
			{message && <p>{message}</p>}
		</div>
	)
}
