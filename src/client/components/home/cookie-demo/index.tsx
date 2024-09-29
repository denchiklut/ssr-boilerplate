import { useCookies } from 'react-cookie'
import css from './styles.scss'

export const CookieDemo = () => {
	const [cookies, setCookie] = useCookies()

	return (
		<div className={css.wrapper}>
			<b>Cookie demo</b>

			<button onClick={() => setCookie('hide', !cookies.hide)}>Toggle</button>
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
