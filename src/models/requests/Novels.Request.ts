import { ObjectId } from 'mongodb'

export interface NovelRequestBody {
  authorName: string
  descriptionImage: URL
  name: string
  category: ObjectId[]
  descriptionURL: URL

  // object include category id
}
export enum NovelStatus {
  upcoming,
  updating,
  full
}
export interface addChapterRequestBoby {
  novelID: string
  chapterName: string
  contentURL: URL
}
export interface getChapterRequestBody {
  novelCode: string
}
