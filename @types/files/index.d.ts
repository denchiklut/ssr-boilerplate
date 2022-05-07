declare module '*.scss' {
	const content: { [className: string]: string }
	export = content;
}

declare module '*.css' {
	const content: { [className: string]: string }
	export = content;
}

declare module '*.png' {
	const content: string
	export default content
}

declare module '*.json' {
	const content: string
	export default content
}

declare module '*.icon.svg' {
	import React = require('react')
	const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	export default ReactComponent
}

declare module '*.svg' {
	const content: string
	export default content
}
