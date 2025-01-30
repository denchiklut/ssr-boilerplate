import { BrowserRouter } from 'react-router'
import { bootstrap } from 'client/utils'
import { basename } from 'src/common'
import { App } from '@shared/app'

const AppContainer = () => (
	<BrowserRouter basename={basename}>
		<App nonce={window.nonce} />
	</BrowserRouter>
)

bootstrap(<AppContainer />)
