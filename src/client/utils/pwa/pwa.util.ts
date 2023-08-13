import { Workbox } from 'workbox-window'
import { basePath } from 'src/common'

export function registerSW(promptForUpdate: () => Promise<boolean>) {
	if (!('serviceWorker' in navigator)) return

	const wb = new Workbox(basePath('/service-worker.js'), {
		scope: '/'
	})

	wb.addEventListener('waiting', async () => {
		wb.addEventListener('controlling', () => window.location.reload())
		console.log(
			"A new service worker has installed, but it can't activate until all tabs running the current version have been unloaded"
		)
		if (await promptForUpdate()) wb.messageSkipWaiting()
	})

	wb.register()
}
