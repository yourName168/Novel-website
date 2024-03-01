import { ObjectId } from 'mongodb'
import { NovelRequestBody, addChapterRequestBoby } from '~/models/requests/Novels.Request'
import { Chapter, Novel } from '~/models/schemas/Novel.Schema'
import { databaseService } from './database.services'
class novelService {
  addNovel = async (payload: NovelRequestBody) => {
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
      } else {
        const res = await databaseService.getCategory.insertOne({
          categoryName: category,
          novelId: [result.insertedId]
        })
      }
    })
    return result
  }

  getListNovelByListId = async (listNovelId?: string[] | string) => {
    if (!listNovelId) {
      const result = await databaseService.getListNovel.find({}).toArray()
      console.log(123)
      return result
    } else {
      const result: Novel[] = []
      if (typeof listNovelId === 'string') {
        await databaseService.getListNovel.findOne({ _id: new ObjectId(listNovelId) }).then((document) => {
          if (document) {
            result.push(document as unknown as Novel)
          }
        })
      } else {
        await Promise.all(
          listNovelId.map(async (id) => {
            const document = await databaseService.getListNovel.findOne({ _id: new ObjectId(id) })
            if (document) {
              result.push(document as unknown as Novel)
            }
          })
        )
      }
      console.log(result)
      return result
    }
  }

  addChapterbyNovelId = async (payload: addChapterRequestBoby) => {
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
  }
  getAllChapterOfNovel = async (novelCode: string) => {
    const result = await databaseService.NovelDB.collection(`${novelCode}`).find({}).toArray()
    return result
  }
  increaseNovelView = async (novelCode: string) => {
    const collection = databaseService.getListNovel
    const result = await collection.updateOne({ novelCode }, { $inc: { view: 1 } })
    return result
  }
  getListNovelSortedByView = async () => {
    const result = await databaseService.getListNovel.find({}).sort({ view: -1 }).toArray()
    return result
  }
  getListNovelSortedAlphabetically = async () => {
    const result = await databaseService.getListNovel.find({}).sort({ novelName: 1 }).toArray()
    return result
  }
  getAllCategory = async () => {
    const result = await databaseService.getCategory.find({}).toArray()
    return result
  }
}

export const NovelService = new novelService()
