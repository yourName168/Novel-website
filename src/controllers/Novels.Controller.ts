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
  const result = await NovelService.getAllChapterOfNovel(req.body)
  res.send(result)
}
