import { Workbox } from 'workbox-window'
import { basePath } from 'src/common'

export function registerSW(promptForUpdate: () => Promise<boolean>) {
	if (!('serviceWorker' in navigator)) return

	const wb = new Workbox(basePath('/service-worker.js'), {
		scope: '/'
	})

	wb.addEventListener('waiting', async () => {
		wb.addEventListener('controlling', () => window.location.reload())

		if (await promptForUpdate()) wb.messageSkipWaiting()
	})

	wb.register()
}
