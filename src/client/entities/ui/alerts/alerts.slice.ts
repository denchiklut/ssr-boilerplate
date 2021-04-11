import { createAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit'

import { AlertSate, AlertsCollection } from './alerts.type'

/*--------------------------------------------------
  actions
  -------------------------------------------------- */
export const toggleAlert = createAction<AlertSate>('ui.alert')

/*--------------------------------------------------
  reducers
  -------------------------------------------------- */
export const alertReducer = createReducer<AlertsCollection>({} as AlertsCollection, builder => {
    builder.addCase(toggleAlert, (state, action) => {
        const { name, data, open } = action.payload
        state[name] = { name, open, data }
    })
})
