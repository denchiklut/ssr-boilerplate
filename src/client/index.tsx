import { BrowserRouter } from 'react-router'
import { App } from './components/@shared/app'
import { basename } from '../common/path'
import { bootstrap } from './utils'

const AppContainer = () => (
	<BrowserRouter basename={basename}>
		<App nonce={window.nonce} />
	</BrowserRouter>
)

bootstrap(<AppContainer />)
