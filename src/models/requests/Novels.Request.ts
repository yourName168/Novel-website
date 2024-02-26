export interface NovelRequestBody {
  authorName: string
  descriptionImage: URL
  name: string
  category: string[]
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
export interface getListNovelByListIdRequestBody {
  listNovelId?: string[]
}
