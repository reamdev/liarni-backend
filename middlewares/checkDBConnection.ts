import {NextFunction, Request, Response} from 'express'
import { checkConnection } from '../db'

const checkDBConnection = async (_req: Request, res: Response, next: NextFunction) => {
	const result = await checkConnection()

	if(result.ok === 1) {
		console.info('DB connection OK')
		next()
	} else {
		res.json({message: 'DB connection error'})
	}

}

export default checkDBConnection