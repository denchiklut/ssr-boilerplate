import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getDebugger } from 'utils/debugger.util'
import { Screen } from './screen.type'

const MEDIA_BREAKPOINT_MOBILE = 735
const MEDIA_BREAKPOINT_TABLET = 990

const initialState: Screen = {
    isMobile: false,
    isTablet: false,
    isDesktop: true
}

const screen = createSlice({
    name: 'ui.screen',
    initialState,
    reducers: {
        changeScreen: {
            reducer(state, action: PayloadAction<Screen>) {
                const { width, height, isDesktop, isMobile, isTablet } = action.payload
                state.width = width
                state.height = height
                state.isDesktop = isDesktop
                state.isMobile = isMobile
                state.isTablet = isTablet
            },
            prepare() {
                const { innerWidth: width, innerHeight: height } = window
                getDebugger('uiActions.changeScreen')('%j', { width, height })

                return {
                    payload: {
                        width,
                        height,
                        isDesktop: width > MEDIA_BREAKPOINT_TABLET,
                        isTablet: width > MEDIA_BREAKPOINT_MOBILE && width <= MEDIA_BREAKPOINT_TABLET,
                        isMobile: width <= MEDIA_BREAKPOINT_MOBILE
                    }
                }
            }
        }
    }
})

export const { changeScreen } = screen.actions

export default screen.reducer
