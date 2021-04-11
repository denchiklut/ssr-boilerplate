export type ModalId = 'ban' | 'restore' | 'saved-search' | 'saved-list' | 'confirm-delete' | 'map'
export interface ModalSate {
    data?: unknown
    name: ModalId
    open: boolean
}

export type ModalsCollection = Collection<ModalId, ModalSate>
