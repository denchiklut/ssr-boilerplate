import { experiments } from '@rspack/core'

export const { Layers } = experiments.rsc

const { ServerPlugin, ClientPlugin } = experiments.rsc.createPlugins()

const listeners = new Set<() => void>()

/** Subscribe to server-component rebuilds (used by the dev HMR middleware). */
export const onRscChange = (listener: () => void) => {
	listeners.add(listener)
	return () => listeners.delete(listener)
}

export const rscClientPlugin = new ClientPlugin()

export const rscServerPlugin = new ServerPlugin({
	onServerComponentChanges() {
		for (const listener of listeners) listener()
	}
})
