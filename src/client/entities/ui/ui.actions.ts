import { useMemo } from 'react'
import { bindActionCreators, Dispatch } from 'redux'

import * as screenActions from './screen/screen.slice'
import * as modalActions from './modals/modals.slice'
import * as alertActions from './alerts/alerts.slice'

export const useScreenActions = (dispatch: Dispatch) => {
    return useMemo(() => bindActionCreators(screenActions, dispatch), [dispatch])
}

export const useModalActions = (dispatch: Dispatch) => {
    return useMemo(() => bindActionCreators(modalActions, dispatch), [dispatch])
}

export const useAlertActions = (dispatch: Dispatch) => {
    return useMemo(() => bindActionCreators(alertActions, dispatch), [dispatch])
}
