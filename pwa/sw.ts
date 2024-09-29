import join from 'url-join'
import { precacheAndRoute } from 'workbox-precaching'
import { googleFontsCache, imageCache, offlineFallback, staticResourceCache } from 'workbox-recipes'
import { setDefaultHandler } from 'workbox-routing'
import { NetworkOnly } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

/**
 * const CDN = "https://cdn.example.com"
 * const paths: Collection<string, string> = {
 * 	 "www.example.com": join(CDN, "prod/app"),
 * 	 "staging.example.com": join(CDN, "dev/app"),
 * 	 "local-app.example.com:3000": "/",
 * }
 * const publicPath = paths[self.location.host] ?? join(CDN, "staging/app")
 */

const publicPath = '/'

precacheAndRoute(
	self.__WB_MANIFEST.map(item => {
		if (typeof item === 'string') return join(publicPath, item)
		return { ...item, url: join(publicPath, item.url) }
	})
)
staticResourceCache()
googleFontsCache()
imageCache({ maxEntries: 60 })
offlineFallback({ pageFallback: join(publicPath, 'pwa/offline.html') })
setDefaultHandler(new NetworkOnly())
addEventListener('message', ({ data }) => {
	if (data.type === 'SKIP_WAITING') self.skipWaiting()
})
