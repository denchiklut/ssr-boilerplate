import React, { FC } from 'react'

import css from './styles.scss'

export const About: FC = () => {
    return (
        <div className={css.wrapper}>
            <h3>About page</h3>
            <p>This is about page</p>
        </div>
    )
}
