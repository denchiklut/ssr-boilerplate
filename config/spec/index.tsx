import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { render as rtlRender, RenderOptions, queries as rtlQueries } from '@testing-library/react'
import { DeepPartial } from '@reduxjs/toolkit'
import { RootState } from 'store/rootReducer'
import * as customQueries from './queries'

import { createSore } from 'client/store'

const render = (
    ui: ReactElement,
    initialState?: DeepPartial<RootState>,
    renderOptions?: Omit<RenderOptions, 'queries'>
) => {
    const { store, history } = createSore(initialState)

    const wrapper: FC = ({ children }) => {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>{children}</ConnectedRouter>
            </Provider>
        )
    }
    const options = {
        queries: { ...customQueries, ...rtlQueries },
        wrapper,
        ...renderOptions
    }

    return rtlRender(ui, options)
}

export * from '@testing-library/react'
export { render }
