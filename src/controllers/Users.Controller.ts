import { NextFunction, Request, Response } from 'express'
import {} from 'express-serve-static-core'
import { userService } from '~/services/Users.Services'

export const regitsterController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await userService.regitsterService(req.body)
  console.log(result)
  res.send(result.insertedId)
}
