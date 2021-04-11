export type AlertId = 'ban' | 'restore' | 'copy' | 'pwa'
export interface AlertSate {
    name: AlertId
    open: boolean
    data?: unknown
}

export type AlertsCollection = Collection<AlertId, AlertSate>
