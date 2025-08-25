import type Cookies from 'universal-cookie'

export interface AppProps {
	nonce: string
	cookies?: Cookies
}
