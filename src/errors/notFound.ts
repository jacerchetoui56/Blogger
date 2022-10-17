import { Request, Response } from "express"
const notFound = (req : Request, res: Response) => res.send('Route does not exist')

export default notFound