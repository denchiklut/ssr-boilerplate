'use client'

import { useCookies } from 'react-cookie'

export const CookieDemo = () => {
	const [cookies, setCookie, removeCookie] = useCookies()

	return (
		<div>
			<b>Cookie demo</b>

			<button type='button' onClick={() => setCookie('hide', !cookies.hide)}>
				Toggle
			</button>

			{/* Unlocks both /private (server-gated) and /private-client (client-gated). */}
			<button
				type='button'
				onClick={() =>
					cookies.session
						? removeCookie('session', { path: '/' })
						: setCookie('session', '1', { path: '/' })
				}
			>
				{cookies.session ? 'Sign out' : 'Sign in'}
			</button>
			{!cookies.hide && (
				<p>
					Reload the page!
					<br />
					There will be no hydration errors since its sync between client/server
				</p>
			)}
		</div>
	)
}
