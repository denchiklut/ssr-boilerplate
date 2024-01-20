import { BrowserRouter } from 'react-router-dom'
import { createEmotionCache } from 'src/common'
import { bootstrap } from 'client/utils'
import { App } from '@shared/app'

const AppContainer = () => {
	const cache = createEmotionCache(window.nonce)

	return (
		<BrowserRouter>
			<App nonce={window.nonce} emotionCache={cache} />
		</BrowserRouter>
	)
}

bootstrap(<AppContainer />)
