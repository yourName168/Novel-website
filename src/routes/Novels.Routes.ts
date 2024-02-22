import express from 'express'
import { get } from 'lodash'
import {
  addChapterController,
  addNovelController,
  getChapterController,
  getListCategoryController,
  getListNovelController,
  getListNovelSortedAlphabeticallyController,
  getListNovelSortedByViewController,
  increaseViewNovelController
} from '~/controllers/Novels.Controller'
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
novelRouter.post('/add-chapter-in-novel', addChapterController)
/**
 * Description. add a new chapter to novel
 * path: /add-chapter-in-novel
 * mothod: POST
 * Body:{novelId:string,chapterName:string,chapterContent:string,chapterIndex:number}
 */
novelRouter.get('/get-chapter-in-novel', getChapterController)
/**
 * Description. get all chapter from novel
 * path: /get-chapter-in-novel
 * mothod: get
 */
novelRouter.patch('/increase-view', increaseViewNovelController)
/**
 * Description. increase view of novel
 * path: /increase-view
 * mothod: PATCH
 * Body:{novelCode:string}
 */
novelRouter.get('/get-novel-sorted-by-view', getListNovelSortedByViewController)
/**
 * Description. get all novel sorted by view
 * path: /get-novel-sorted-by-view
 * mothod: get
 */
novelRouter.get('/get-novel-sorted-alphabetically', getListNovelSortedAlphabeticallyController)
/**
 * Description. get all novel sorted alphabetically
 * path: /get-novel-sorted-alphabetically
 * mothod: get
 */
novelRouter.get('/get-all-category', getListCategoryController)
/**
 * Description. get all category
 * path: /get-all-category
 * mothod: get
 */
export default novelRouter
