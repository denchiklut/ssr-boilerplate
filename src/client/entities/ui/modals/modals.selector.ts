import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/rootReducer'
import { ModalId, ModalSate } from './modals.type'

export const selectModalsCollection = (state: RootState) => state.ui.modals

export const selectModalStateById = createSelector(
    [selectModalsCollection, (_: RootState, modalId: ModalId) => modalId],
    (modals, id) => modals[id] ?? ({ open: false } as ModalSate)
)
