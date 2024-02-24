import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import novelRouter from './routes/Novels.Routes'
import userRoute from './routes/User.Routes'
import { databaseService } from './services/database.services'
dotenv.config()

const app: Express = express()
const port = process.env.PORT

databaseService.run()
app.use(express.json())
app.use(cors())
//test for rebase
app.use('/users', userRoute)
app.use('/novels', novelRouter)
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
