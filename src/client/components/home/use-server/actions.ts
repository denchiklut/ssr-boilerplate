'use server'

import { setTimeout } from 'node:timers/promises'

export const createServerGreeting = async (name: string) => {
	const normalizedName = name.trim()

	if (!normalizedName || normalizedName.length > 50) {
		throw new Error('Name must contain between 1 and 50 characters')
	}

	await setTimeout(500)

	return `Hello, ${normalizedName}! The server generated this at ${new Date().toISOString()}.`
}
