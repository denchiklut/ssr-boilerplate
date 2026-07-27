import { request, response } from '@/server/request'
import { Page } from '@/shared/page'

export default function Private() {
	const { cookies } = request()
	const { headers, redirect } = response()

	// Session-gated content must never land in a shared cache (docs/rsc.md §8.2)
	headers.set('Cache-Control', 'private, no-store')

	// Redirecting from a server component ends the render — the response never
	// reaches the browser as HTML. Do it before anything streams (see docs/rsc.md §12).
	if (!cookies.get('session')) redirect('/')

	return (
		<Page title='SSR: Private'>
			<h1>Private</h1>
			<p>Visible only with a `session` cookie set.</p>
		</Page>
	)
}
