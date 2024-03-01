import { NextFunction, Request, Response } from 'express'
import { NovelService } from '~/services/Novels.Services'

export const addNovelController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await NovelService.addNovel(req.body)
  res.send(result)
}
export const getListNovelByListIdController = async (req: Request, res: Response, next: NextFunction) => {
  const listNovelId = req.query.listNovelId as string[] | string
  const result = await NovelService.getListNovelByListId(listNovelId)
  res.send(result)
}

export const addChapterOfNovelController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await NovelService.addChapterbyNovelId(req.body)
  res.send(result)
}
export const getChapterOfNovelController = async (req: Request, res: Response, next: NextFunction) => {
  const novelCode = req.query.novelCode as string
  const result = await NovelService.getAllChapterOfNovel(novelCode)
  res.send(result)
}
export const increaseNovelViewController = async (req: Request, res: Response, next: NextFunction) => {
  const novelCode = req.body.novelCode as string
  const result = await NovelService.increaseNovelView(novelCode)
  res.send(result)
}
export const getListNovelSortedByViewController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await NovelService.getListNovelSortedByView()
  res.send(result)
}
export const getListNovelSortedAlphabeticallyController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await NovelService.getListNovelSortedAlphabetically()
  res.send(result)
}
export const getListCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await NovelService.getAllCategory()
  res.send(result)
}
