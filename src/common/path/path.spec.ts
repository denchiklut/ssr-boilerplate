import { joinPath } from './path.util'

describe('joinPath', () => {
	it('should return `/test`', () => {
		const result = [
			joinPath('/', 'test'),
			joinPath('/', '/test'),
			joinPath('', '/test'),
			joinPath('/test')
		]

		result.map(p => expect(p).toBe('/test'))
	})

	it('should return `/base/test`', () => {
		const result = [
			joinPath('/base', '/test'),
			joinPath('/base/', '/test'),
			joinPath('/base/', 'test'),
			joinPath('/base', 'test')
		]

		result.map(p => expect(p).toBe('/base/test'))
	})

	it('should return `/foo/baz/bar`', () => {
		const result = [
			joinPath('/foo/', '/baz/', '/bar', ''),
			joinPath('/foo', '/baz/', '/bar'),
			joinPath('/foo/baz', '', '/bar'),
			joinPath('/foo', 'baz', 'bar')
		]

		result.map(p => expect(p).toBe('/foo/baz/bar'))
	})
})
