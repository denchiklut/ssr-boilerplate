import { NetworkOnly } from 'workbox-strategies'
import { setDefaultHandler } from 'workbox-routing'
import { precacheAndRoute } from 'workbox-precaching'
import { googleFontsCache, imageCache, offlineFallback } from 'workbox-recipes'

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)
googleFontsCache()
setDefaultHandler(new NetworkOnly())
imageCache({ maxEntries: 60 })
offlineFallback()
