import { ObjectId } from 'mongodb'
import { NovelStatus } from '../requests/Novels.Request'

interface NovelSType {
  descriptionURL: URL
  novelCode: string
  authorName: string
  Episodes?: number
  descriptionImage: URL
  name: string
  category?: ObjectId[]
  view?: number
  status?: NovelStatus
}
export class Novel {
  private descriptionURL: URL
  private novelCode: string
  private authorName: string
  private Episodes: number
  private descriptionImage: URL | string
  private novelName: string
  private category: ObjectId[] | undefined
  private view: number
  private status: NovelStatus
  getNovelCode = () => this.novelCode
  constructor(novel: NovelSType) {
    this.descriptionURL = novel.descriptionURL
    this.novelCode = novel.novelCode
    this.authorName = novel.authorName
    this.Episodes = 0
    this.descriptionImage = ''
    this.novelName = novel.name
    this.category = novel.category
    this.view = 0
    this.status = NovelStatus.upcoming
  }
}

interface ChapterType {
  parentID: string
  novelCode: string
  chapterNumber: number
  contentURL: string
}
export class Chapter {
  private parentID: string
  private novelCode: string
  private chapterNumber: number
  private contentURL: string
  constructor(chapter: ChapterType) {
    this.parentID = chapter.parentID
    this.novelCode = chapter.novelCode
    this.chapterNumber = chapter.chapterNumber
    this.contentURL = chapter.contentURL
  }
}
