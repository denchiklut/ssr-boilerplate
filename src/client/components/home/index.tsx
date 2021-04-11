import React, { FC } from 'react'

import css from './styles.scss'

export const Home: FC = () => {
    return (
        <div className={css.wrapper}>
            <h3>Home page</h3>
            <p>This is main page</p>
        </div>
    )
}
