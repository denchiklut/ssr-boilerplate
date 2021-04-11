import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import { TopLine } from './index'

describe('<TopLine />', () => {
    it('Correct render', () => {
        render(<TopLine onCLick={jest.fn()} />)

        expect(screen.getByText('SSR APP')).toBeInTheDocument()
    })

    it('Call callback', () => {
        const callback = jest.fn()
        const { getByTestId } = render(<TopLine onCLick={callback} />)

        fireEvent.click(getByTestId('toggle'))
        expect(callback).toHaveBeenCalled()
    })
})
