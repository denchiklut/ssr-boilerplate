import { render } from '@testing-library/react'
import { State } from './index'

describe('<State />', () => {
	it('should render correctly', () => {
		const { getByText } = render(<State />)

		expect(getByText('Increase')).toBeInTheDocument()
	})
})
