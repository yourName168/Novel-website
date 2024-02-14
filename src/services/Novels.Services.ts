import { ObjectId } from 'mongodb'
import { NovelRequestBody, addChapterRequestBoby } from '~/models/requests/Novels.Request'
import { Novel } from '~/models/schemas/Novel.Schema'
import { databaseService } from './database.services'
import { Chapter } from '~/models/schemas/Novel.Schema'
class novelService {
  addNovel = async (payload: NovelRequestBody) => {
    try {
      const collection = databaseService.getListNovel
      const maxNum = await collection.countDocuments()
      const novelCode = `novel-${maxNum}`
      const _id = await collection.insertOne(new Novel({ ...payload, novelCode }))
      const result = await databaseService.NovelDB.collection(`${novelCode}`).insertOne({
        novelID: _id,
        novelCode,
        name: payload.name,
        authorName: payload.authorName,
        descriptionImage: payload.descriptionImage,
        descriptionURL: payload.descriptionURL,
        category: payload.category,
        view: 0,
        status: 'upcoming',
        Episodes: 0
      })
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
      const novelCode = novel.getNovelCode()
      const result = await databaseService.NovelDB.collection(`${novelCode}`).insertOne({
        ...payload,
        parentID,
        novelCode
      })
      return result
    } catch (error) {
      throw error
    }
  }
}

export const NovelService = new novelService()
