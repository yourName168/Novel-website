import express from 'express'
import { regitsterController } from '~/controllers/Users.Controller'

const userRoute = express.Router()
userRoute.post('/regitster', regitsterController)
/**
 * Description. login a new user
 * path: /login
 * mothod: POST
 * Body:{password:string,email:string,name:string,username:string}
 */
export default userRoute
