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
      const categoryName = payload.category
      categoryName.map(async (category) => {
        const documentCategoryName = await databaseService.getCategory.findOne({ categoryName: category })
        if (documentCategoryName) {
          const res = await databaseService.getCategory.updateOne(
            { categoryName: category },
            { $push: { novelId: result.insertedId } }
          )
          console.log(res)
        } else {
          const res = await databaseService.getCategory.insertOne({
            categoryName: category,
            novelId: [result.insertedId]
          })
          console.log(res)
        }
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
      console.log('1')
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
      const novelColection = databaseService.NovelDB.collection(`${novelCode}`)
      const maxNum = (await novelColection.countDocuments()) + 1
      const result = await novelColection.insertOne(
        new Chapter({ ...payload, parentID: parentID.toString(), novelCode, chapterNumber: maxNum })
      )
      return result
    } catch (error) {
      throw error
    }
  }
  getAllChapterOfNovel = async (novelCode: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await databaseService.NovelDB.collection(`${novelCode}`).find({}).toArray()
      console.log(result)
      return result
    } catch (error) {
      throw error
    }
  }
  increaseViewNovel = async (payload: { novelCode: string }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const collection = databaseService.getListNovel
      const result = await collection.updateOne({ novelCode: payload.novelCode }, { $inc: { view: 1 } })
      return result
    } catch (error) {
      throw error
    }
  }
  getListNovelSortedByView = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await databaseService.getListNovel.find({}).sort({ view: -1 }).toArray()
      return result
    } catch (error) {
      throw error
    }
  }
  getListNovelSortedAlphabetically = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await databaseService.getListNovel.find({}).sort({ novelName: 1 }).toArray()
      return result
    } catch (error) {
      throw error
    }
  }
  getListCategory = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await databaseService.getCategory.find({}).toArray()
      return result
    } catch (error) {
      throw error
    }
  }
}

export const NovelService = new novelService()
