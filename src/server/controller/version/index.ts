import type { Request, Response } from 'express'
import { getENV } from '@/common/env'

export const version = (_: Request, res: Response) => {
	const version = getENV('APP_VERSION')

	res.status(200).send(version)
}
