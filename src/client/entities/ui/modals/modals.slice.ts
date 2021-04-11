import { createAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit'

import { ModalSate, ModalsCollection } from './modals.type'

/*--------------------------------------------------
  actions
  -------------------------------------------------- */
export const toggleModal = createAction<ModalSate>('ui.modal')

/*--------------------------------------------------
  reducers
  -------------------------------------------------- */
export const modalReducer = createReducer<ModalsCollection>({} as ModalsCollection, builder => {
    builder.addCase(toggleModal, (state, action) => {
        const { name, open, data } = action.payload
        state[name] = { open, data, name }
    })
})
