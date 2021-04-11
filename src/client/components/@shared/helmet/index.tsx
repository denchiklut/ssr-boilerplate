import React, { FC } from 'react'
import { Helmet as ReactHelmet } from 'react-helmet'

import { prepareData } from './helpers'
import type { Props } from './types'

export const Helmet: FC<Props> = props => {
    const { title = 'moderilka', description, image } = prepareData(props)

    return (
        <ReactHelmet>
            <title>{title}</title>
            <meta property='og:title' content={title} />
            <meta property='twitter:title' content={title} />

            {Boolean(description) && <meta name='description' content={description} />}
            {Boolean(description) && <meta property='og:description' content={description} />}
            {Boolean(description) && <meta property='twitter:description' content={description} />}
            {Boolean(image) && <meta property='og:image' content={image} />}
        </ReactHelmet>
    )
}
