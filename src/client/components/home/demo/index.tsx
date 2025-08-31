import Icon from './react.icon.svg'
import regular from './regular.svg'

export function Demo() {
	return (
		<div>
			<h3>SVGR Demo</h3>
			<img style={{ width: 50, height: 50 }} src={regular} alt='' />
			<Icon style={{ width: 50, height: 50 }} />
		</div>
	)
}
