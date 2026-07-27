'use client'

import { useCookies } from 'react-cookie'

import { Page } from '@/shared/page'
import { Redirect } from '@/utils'

export const SessionGate = () => {
	const [cookies, _, removeCookie] = useCookies(['session'])
	// One branch, two transports. On the initial document this component runs on
	// the *server* (during the SSR pass), where `useCookies` is seeded from the
	// request header by `Providers` — so the browser gets a real 307 and the page
	// never renders. On a client navigation it runs only in the browser and
	// `<Redirect>` degrades to `<Navigate>`. See docs/rsc.md §12.
	if (!cookies.session) return <Redirect href='https://www.google.com' />

	return (
		<Page title='SSR: Private (client)'>
			<h1>Private (client)</h1>
			<p>
				Gated by a <b>client</b> component reading the `session` cookie — compare with{' '}
				<a href='/private'>/private</a>, which gates the same cookie from a server
				component.
			</p>

			{/* `useCookies` is reactive, which is the part a server component can't do:
			    dropping the cookie re-renders the gate and redirects with no round trip. */}
			<button type='button' onClick={() => removeCookie('session', { path: '/' })}>
				Clear session
			</button>
		</Page>
	)
}
