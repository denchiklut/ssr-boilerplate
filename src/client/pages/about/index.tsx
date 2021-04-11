import React from 'react'

import { Helmet } from '@shared/helmet'
import { About } from 'components/about'

export default function UserPage() {
    return (
        <>
            <Helmet title='Страница About' />

            <About />
        </>
    )
}
