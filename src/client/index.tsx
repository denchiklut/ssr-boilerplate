import { BrowserRouter } from 'react-router'
import { basename } from '../common/path'
import { App } from './components/@shared/app'
import { bootstrap } from './utils'

const AppContainer = () => (
	<BrowserRouter basename={basename}>
		<App nonce={window.nonce} />
	</BrowserRouter>
)

bootstrap(<AppContainer />)
