import type Cookies from 'universal-cookie'

export interface AppProps {
	nonce: string
	css?: string[]
	cookies?: Cookies
}
