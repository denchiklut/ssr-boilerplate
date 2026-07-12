'use server'

const wait = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds))

export const submitDisplayName = async (formData: FormData) => {
	const displayName = formData.get('displayName')

	if (typeof displayName !== 'string' || !displayName.trim()) {
		throw new Error('A display name is required')
	}

	// Keep the request pending long enough to make useFormStatus visible in the demo.
	await wait(1_500)
}
