import { response } from '@/server/request'
import { Page } from '@/shared/page'

export default () => {
	const { status } = response()
	status(404)

	return (
		<Page title='SSR: Not found'>
			<p>Not found</p>
		</Page>
	)
}
