import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App, routes } from '@shared/app'
import { Loader } from '@shared/loader'
import { bootstrap } from 'client/utils'
import { basename } from 'src/common'

const AppContainer = () => (
	<App>
		<RouterProvider
			router={createBrowserRouter(routes, { basename })}
			fallbackElement={<Loader />}
		/>
	</App>
)

bootstrap(<AppContainer />)
