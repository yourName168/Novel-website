import { ObjectId } from 'mongodb'

export interface NovelRequestBody {
  authorName: string
  descriptionImage: URL
  name: string
  category: ObjectId[]
  // object include category id
}
export enum NovelStatus {
  updating,
  umcoming,
  full
}
export interface addChapterRequestBoby {
  novelID: string
  chapterNumber: number
  content: string
}
