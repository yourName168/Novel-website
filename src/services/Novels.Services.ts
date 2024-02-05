import { NovelRequestBody, addChapterRequestBoby } from '~/models/requests/Novels.Request'
import { databaseService } from './database.services'
import { Novel } from '~/models/schemas/Novel.Schema'

class novelService {
  addNovel = async (payload: NovelRequestBody) => {
    try {
      const collection = databaseService.getListNovel
      const maxNum = await collection.countDocuments()
      const novelID = `novel-${maxNum}`

      const result = await collection.insertOne(new Novel({ ...payload, novelID }))
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
  addNovelChapter = async (payload: addChapterRequestBoby) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const novel = databaseService.getListNovel.findOne({ _id: new Object(payload.novelID) })
    } catch (error) {
      throw error
    }
  }
}

export const NovelService = new novelService()
