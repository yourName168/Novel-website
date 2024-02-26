import express from 'express'
import {
  addChapterOfNovelController,
  addNovelController,
  getChapterOfNovelController,
  getListCategoryController,
  getListNovelByListIdController,
  getListNovelSortedAlphabeticallyController,
  getListNovelSortedByViewController,
  increaseNovelViewController
} from '~/controllers/Novels.Controller'
import { wrap } from '~/utils/handler'
const novelRouter = express.Router()
novelRouter.post('/add-novel', wrap(addNovelController))
/**
 * Description. add a new novel to Database
 * path: /add-novel
 * mothod: POST
 * Body:{authorName:string,image:URL,name:string,category:object}
 */
novelRouter.get('/get-list-novel-by-list-id', wrap(getListNovelByListIdController))
/**
 * Description. get all novel from database
 * path: /get-novel
 * mothod: get
 * Query:{listNovelId?:string[]}
 */
novelRouter.post('/add-chapter-in-novel', wrap(addChapterOfNovelController))
/**
 * Description. add a new chapter to novel
 * path: /add-chapter-in-novel
 * mothod: POST
 * Body:{novelId:string,chapterName:string,chapterContent:string,chapterIndex:number}
 */
novelRouter.get('/get-chapter-in-novel', wrap(getChapterOfNovelController))
/**
 * Description. get all chapter from novel
 * path: /get-chapter-in-novel
 * mothod: get
 */
novelRouter.patch('/increase-view', wrap(increaseNovelViewController))
/**
 * Description. increase view of novel
 * path: /increase-view
 * mothod: PATCH
 * Body:{novelCode:string}
 */
novelRouter.get('/get-novel-sorted-by-view', wrap(getListNovelSortedByViewController))
/**
 * Description. get all novel sorted by view
 * path: /get-novel-sorted-by-view
 * mothod: get
 */
novelRouter.get('/get-novel-sorted-alphabetically', wrap(getListNovelSortedAlphabeticallyController))
/**
 * Description. get all novel sorted alphabetically
 * path: /get-novel-sorted-alphabetically
 * mothod: get
 */
novelRouter.get('/get-all-category', wrap(getListCategoryController))
/**
 * Description. get all category
 * path: /get-all-category
 * mothod: get
 */
export default novelRouter
