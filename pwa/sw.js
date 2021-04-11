import { setDefaultHandler } from 'workbox-routing'
import { precacheAndRoute } from 'workbox-precaching'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update'
import { offlineFallback, imageCache, staticResourceCache, pageCache } from 'workbox-recipes'


precacheAndRoute(self.__WB_MANIFEST)

pageCache()

staticResourceCache()

imageCache({ maxEntries: 60 })

offlineFallback({ pageFallback: 'offline.html' })

setDefaultHandler(
    new StaleWhileRevalidate({
        plugins: [new BroadcastUpdatePlugin()]
    })
)
