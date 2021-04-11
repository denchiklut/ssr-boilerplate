import React from 'react'
import { render, screen } from 'config/spec'

import { Drawer } from './index'

describe('<Drawer />', () => {
    it('Correct render', () => {
        render(
            <Drawer>
                <span>Hello world</span>
            </Drawer>
        )

        expect(screen.getByText('Hello world')).toBeInTheDocument()
    })
})
