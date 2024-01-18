import { BrowserRouter } from 'react-router-dom'
import { bootstrap } from 'client/utils'
import { App } from '@shared/app'

const AppContainer = () => (
	<BrowserRouter>
		<App nonce={window.nonce} />
	</BrowserRouter>
)

bootstrap(<AppContainer />)
