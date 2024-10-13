import 'dotenv/config'

export function safeUrl() {
	try {
		return new URL(process.env.CLIENT_HOST ?? 'http://localhost:3000')
	} catch (err) {
		return new URL('http://localhost:3000')
	}
}
