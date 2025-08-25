import { render } from '@testing-library/react'
import { About } from './index'

describe('<About />', () => {
	it('should render correctly', () => {
		const { getByText } = render(<About />)

		expect(getByText('About page')).toBeInTheDocument()
	})
})
