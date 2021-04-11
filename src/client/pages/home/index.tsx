import React from 'react'

import { Helmet } from '@shared/helmet'
import { Home } from 'components/home'

export default function HomePage() {
    return (
        <>
            <Helmet title='Страница Home' />

            <Home />
        </>
    )
}
