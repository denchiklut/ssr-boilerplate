import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App, routes } from '@shared/app'
import { Loader } from '@shared/loader'
import { bootstrap } from 'client/utils'
import { basename, getQueryClient } from 'src/common'

const AppContainer = () => {
	const client = getQueryClient()

	return (
		<App nonce={window.nonce} client={client}>
			<RouterProvider
				router={createBrowserRouter(routes, { basename })}
				fallbackElement={<Loader />}
			/>
		</App>
	)
}

bootstrap(<AppContainer />)
