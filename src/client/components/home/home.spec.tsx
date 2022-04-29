import { render } from '@testing-library/react'
import { Home } from './index'

describe('<Home />', () => {
    it('should render correctly', () => {
        const { getByText } = render(<Home />)

        expect(getByText('Home page!')).toBeInTheDocument()
    })
})
