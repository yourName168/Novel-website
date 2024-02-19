import { ObjectId } from 'mongodb'
import { NovelRequestBody, addChapterRequestBoby, getChapterRequestBody } from '~/models/requests/Novels.Request'
import { Chapter, Novel } from '~/models/schemas/Novel.Schema'
import { databaseService } from './database.services'
class novelService {
  addNovel = async (payload: NovelRequestBody) => {
    try {
      const collection = databaseService.getListNovel
      const maxNum = (await collection.countDocuments()) + 1
      const novelCode = `novel-${maxNum}`
      const result = await collection.insertOne(new Novel({ ...payload, novelCode }))
      databaseService.NovelDB.createCollection(`${novelCode}`)
      return result
    } catch (error) {
      console.error(error)
      throw error // Rethrow the error for further handling if necessary
    }
  }

  getAllNovelId = async () => {
    try {
      const result = await databaseService.getListNovel.find({}).toArray()
      console.log(result)
      return result
    } catch (error) {
      console.error(error)
      throw error // Rethrow the error for further handling if necessary
    }
  }

  addChapter = async (payload: addChapterRequestBoby) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const parentID = new ObjectId(payload.novelID)
      const novel = await databaseService.getListNovel.findOne({ _id: parentID })
      if (!novel) throw new Error('Novel not found')
      const novelCode = novel.novelCode
      const novelColection = await databaseService.NovelDB.collection(`${novelCode}`)
      const maxNum = (await novelColection.countDocuments()) + 1
      const result = await novelColection.insertOne(
        new Chapter({ ...payload, parentID: parentID.toString(), novelCode, chapterNumber: maxNum })
      )
      return result
    } catch (error) {
      throw error
    }
  }
  getAllChapterOfNovel = async (payload: getChapterRequestBody) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await databaseService.NovelDB.collection(`${payload.novelCode}`).find({}).toArray()
      console.log(result)
      return result
    } catch (error) {
      throw error
    }
  }
}

export const NovelService = new novelService()
