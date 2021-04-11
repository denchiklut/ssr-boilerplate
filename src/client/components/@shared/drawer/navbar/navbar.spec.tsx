import React from 'react'
import { render, screen } from 'config/spec'

import { Navbar } from './index'

describe('<Navbar />', () => {
    it('Correct render', () => {
        render(<Navbar toggle={jest.fn()} isOpen />)

        expect(screen.getByText('Home')).toBeInTheDocument()
    })
})
