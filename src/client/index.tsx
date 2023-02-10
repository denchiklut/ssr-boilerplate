import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App, routes } from '@shared/app'
import { Loader } from '@shared/loader'
import { bootstrap } from 'client/utils'

const AppContainer = () => (
	<App>
		<RouterProvider router={createBrowserRouter(routes)} fallbackElement={<Loader />} />
	</App>
)

bootstrap(<AppContainer />)
