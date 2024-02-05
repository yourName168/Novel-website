import { RegitsterRequest } from '~/models/requests/User.request'
import User from '~/models/schemas/Users.Schema'
import { ObjectId } from 'mongodb'
import { hashPassword } from '~/constants/crypto'
import { databaseService } from './database.services'

class UserService {
  regitsterService = async (payload: RegitsterRequest) => {
    const result = await databaseService.getUser.insertOne(
      new User({
        ...payload,
        password: hashPassword(payload.password)
      })
    )
    return result
  }
}
export const userService = new UserService()
