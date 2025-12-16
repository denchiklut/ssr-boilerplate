import { basename, basePath } from '@/src/common'
import { Workbox } from 'workbox-window'

export function registerSW(promptForUpdate: () => Promise<boolean>) {
	if (!('serviceWorker' in navigator)) return

	const wb = new Workbox(basePath('/service-worker.js'), { scope: basename })

	wb.addEventListener('waiting', async () => {
		wb.addEventListener('controlling', () => window.location.reload())

		if (await promptForUpdate()) wb.messageSkipWaiting()
	})

	wb.register()
}
