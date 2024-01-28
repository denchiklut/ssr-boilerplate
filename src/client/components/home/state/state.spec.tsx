import { render } from '@testing-library/react'
import { State } from './index'

describe('<State />', () => {
	it('should render correctly', () => {
		const { getByTestId } = render(<State />)

		expect(getByTestId('btn')).toBeInTheDocument()
	})
})
