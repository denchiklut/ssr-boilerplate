import { BrowserRouter } from 'react-router'

import { basename, getQueryClient } from '@/common'
import { App } from '@/shared/app'

import { bootstrap } from './utils'

const AppContainer = () => (
	<BrowserRouter basename={basename}>
		<App nonce={window.nonce} client={getQueryClient()} />
	</BrowserRouter>
)

bootstrap(<AppContainer />)
