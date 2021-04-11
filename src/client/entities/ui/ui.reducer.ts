import { combineReducers } from 'redux'
import screenReducer from './screen/screen.slice'
import { modalReducer } from './modals/modals.slice'
import { alertReducer } from './alerts/alerts.slice'

export default combineReducers({
    screen: screenReducer,
    modals: modalReducer,
    alerts: alertReducer
})
