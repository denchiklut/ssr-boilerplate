import { redirect } from '@/server/navigation'
import { request } from '@/server/request'
import { Page } from '@/shared/page'

export default async function Private() {
	const { cookies } = await request()

	// Redirecting from a server component ends the render — the response never
	// reaches the browser as HTML. Do it before anything streams (see docs/rsc.md §11).
	if (!cookies.get('session')) redirect('/')

	return (
		<Page title='SSR: Private'>
			<h1>Private</h1>
			<p>Visible only with a `session` cookie set.</p>
		</Page>
	)
}
