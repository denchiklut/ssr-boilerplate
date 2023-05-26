import path from 'path'
import { type PathLike, statSync } from 'fs'

function workspaceRootInner(dir: string, candidateRoot: string): string {
	if (path.dirname(dir) === dir) return candidateRoot

	const matches = [path.join(dir, 'webpack.config.ts')]

	if (matches.some(x => fileExists(x))) return dir
	else return workspaceRootInner(path.dirname(dir), candidateRoot)
}

function fileExists(path: PathLike): boolean {
	try {
		return statSync(path).isFile()
	} catch {
		return false
	}
}

export const workspaceRoot = workspaceRootInner(process.cwd(), process.cwd())
