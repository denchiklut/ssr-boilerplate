import debugLib from 'debug'

const debug = process.env.DEBUG

if (debug) debugLib.enable(debug)
else debugLib.disable()

export const getDebugger = (debugLabel: string) => debugLib(`APP:${debugLabel}`)
