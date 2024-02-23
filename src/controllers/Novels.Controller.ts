import { NextFunction, Request, Response } from 'express'
import { NovelService } from '~/services/Novels.Services'

export const addNovelController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await NovelService.addNovel(req.body)
  res.send(result)
}
export const getListNovelController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await NovelService.getAllNovelId()
  res.send(result)
}

export const addChapterController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await NovelService.addChapter(req.body)
  res.send(result)
}
export const getChapterController = async (req: Request, res: Response, next: NextFunction) => {
  const novelCode = (await req.query.novelCode) as string
  const result = await NovelService.getAllChapterOfNovel(novelCode)
  res.send(result)
}
export const increaseViewNovelController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await NovelService.increaseViewNovel(req.body)
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
  const result = await NovelService.getListCategory()
  res.send(result)
}
