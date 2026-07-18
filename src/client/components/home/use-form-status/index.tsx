import { submitDisplayName } from './actions'
import { Submit } from './submit'

export const UseFormStatusDemo = () => {
	return (
		<div>
			<b>useFormStatus demo</b>
			<p>The submit button and message reflect the parent form&apos;s pending state.</p>
			<form action={submitDisplayName}>
				<label>
					Display name: <input name='displayName' required defaultValue='Rspack user' />
				</label>{' '}
				<Submit />
			</form>
		</div>
	)
}
