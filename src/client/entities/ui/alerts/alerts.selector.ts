import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/rootReducer'
import { AlertId } from './alerts.type'

export const selectAlertsCollection = (state: RootState) => state.ui.alerts

export const selectAlertStateById = createSelector(
    [selectAlertsCollection, (_: RootState, alertId: AlertId) => alertId],
    (alerts, id) => alerts[id] ?? { open: false }
)
