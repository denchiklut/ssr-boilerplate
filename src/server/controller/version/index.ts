import type { Request, Response } from 'express'
import { getENV } from '../../../common'

export const version = (_: Request, res: Response) => {
	const version = getENV('APP_VERSION')

	res.status(200).send(version)
}
