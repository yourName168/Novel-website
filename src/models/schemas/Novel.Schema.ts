import { ObjectId } from 'mongodb'
import { NovelStatus } from '../requests/Novels.Request'

interface NovelSType {
  novelID: string
  authorName: string
  Episodes?: number
  descriptionImage: URL
  name: string
  category?: ObjectId[]
  view?: number
  status?: NovelStatus
}
export class Novel {
  private novelID: string
  private authorName: string
  private Episodes: number
  private descriptionImage: URL | string
  private name: string
  private category: ObjectId[] | undefined
  private view: number
  private status: NovelStatus
  private setNovelID(ID: string) {
    this.novelID = ID
  }
  constructor(novel: NovelSType) {
    this.novelID = novel.novelID
    this.authorName = novel.authorName
    this.Episodes = 0
    this.descriptionImage = ''
    this.name = novel.name
    this.category = novel.category
    this.view = 0
    this.status = NovelStatus.umcoming
  }
}

interface ChapterType {
  parentID: string
  novelID: string
  chapterNumber: number
  content: string
}
class Chapter {
  private parentID: string
  private novelID: string
  private chapterNumber: number
  private content: string
  constructor(chapter: ChapterType) {
    this.parentID = chapter.parentID
    this.novelID = chapter.novelID
    this.chapterNumber = chapter.chapterNumber
    this.content = chapter.content
  }
}
