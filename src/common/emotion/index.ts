import createCache from '@emotion/cache'

export const createEmotionCache = (nonce?: string) => createCache({ nonce, key: 'app' })
