import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import uiReducer from 'client/entities/ui/ui.reducer'

const createRootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        // collections: combineReducers({}),
        ui: uiReducer
    })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
export default createRootReducer
