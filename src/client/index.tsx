import { createBrowserRouter, RouterProvider } from 'react-router'
import { App, routes } from '@shared/app'
import { bootstrap } from 'client/utils'
import { basename } from 'src/common'

const AppContainer = () => (
	<App nonce={window.nonce}>
		<RouterProvider router={createBrowserRouter(routes, { basename })} />
	</App>
)

bootstrap(<AppContainer />)
