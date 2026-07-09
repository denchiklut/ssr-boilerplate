'use client'

import { useCookies } from 'react-cookie'

export const CookieDemo = () => {
	const [cookies, setCookie] = useCookies()

	return (
		<div>
			<b>Cookie demo</b>

			<button type='button' onClick={() => setCookie('hide', !cookies.hide)}>
				Toggle
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
