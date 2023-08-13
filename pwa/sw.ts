import { precacheAndRoute } from 'workbox-precaching'
import { googleFontsCache, imageCache, offlineFallback, staticResourceCache } from 'workbox-recipes'
import { setDefaultHandler } from 'workbox-routing'
import { NetworkOnly } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

const publicPath = process.env.PUBLIC_PATH ?? '/'

precacheAndRoute(self.__WB_MANIFEST)
staticResourceCache()
googleFontsCache()
imageCache({ maxEntries: 60 })
offlineFallback({
	pageFallback: `${publicPath.endsWith('/') ? '' : '/'}pwa/offline.html`
})
setDefaultHandler(new NetworkOnly())
addEventListener('message', ({ data }) => {
	if (data.type === 'SKIP_WAITING') self.skipWaiting()
})
