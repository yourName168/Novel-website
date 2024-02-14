import express from 'express'
import { addChapterController, addNovelController, getListNovelController } from '~/controllers/Novels.Controller'
const novelRouter = express.Router()
novelRouter.post('/add-novel', addNovelController)
/**
 * Description. add a new novel to Database
 * path: /add-novel
 * mothod: POST
 * Body:{authorName:string,image:URL,name:string,category:object}
 */
novelRouter.get('/get-list-novel-id', getListNovelController)
/**
 * Description. get all novel from database
 * path: /get-novel
 * mothod: get
 */
novelRouter.post('add-chapter-in-novel', addChapterController)
/**
 * Description. add a new chapter to novel
 * path: /add-chapter-in-novel
 * mothod: POST
 * Body:{novelId:string,chapterName:string,chapterContent:string,chapterIndex:number}
 */
export default novelRouter
