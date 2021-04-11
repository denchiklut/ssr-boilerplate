import { Workbox } from 'workbox-window'
import { Store } from '@reduxjs/toolkit'
import { toggleAlert } from 'client/entities/ui/alerts/alerts.slice'

export function registerSW(store: Store) {
    if ('serviceWorker' in navigator) {
        const wb = new Workbox('/service-worker.js', { scope: '/' })

        wb.addEventListener('activated', event => {
            const urlsToCache = [location.href, ...performance.getEntriesByType('resource').map(({ name }) => name)]

            wb.messageSW({
                type: 'CACHE_URLS',
                payload: { urlsToCache }
            })
        })

        wb.addEventListener('waiting', event => {
            console.log(`A new service worker has installed, but it can\'t activate
               until all tabs running the current version have fully unloaded.`)
        })

        wb.addEventListener('message', event => {
            if (event.data.type === 'CACHE_UPDATED') {
                const { updatedURL } = event.data.payload

                store.dispatch(toggleAlert({ name: 'pwa', open: true, data: updatedURL }))
                console.log(`A newer version of ${updatedURL} is available!`)
            }
        })

        wb.register()
    }
}
