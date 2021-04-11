import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router'
import _throttle from 'lodash/throttle'
import { hot } from 'react-hot-loader/root'

import { Drawer } from '@shared/drawer'
import { ErrorBoundary } from '@shared/error-boundary'
import { useScreenActions } from 'client/entities/ui/ui.actions'
import routes from 'client/routes'

import './styles.scss'

const App = () => {
    const dispatch = useDispatch()
    const { changeScreen } = useScreenActions(dispatch)

    useEffect(() => {
        addEventListener('resize', _throttle(changeScreen, 500))
        changeScreen()
    }, [changeScreen])

    return (
        <ErrorBoundary>
            <Drawer>
                <Switch>
                    {routes.map(route => (
                        <Route key={route.path} {...route} />
                    ))}
                </Switch>
            </Drawer>
        </ErrorBoundary>
    )
}

export default hot(App)
