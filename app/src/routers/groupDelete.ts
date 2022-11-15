import { Request, Response, Router } from 'express'
import { searchGroupByField, deleteGroup } from '../redis'
import { BadRequestError } from '../errors/badRequestError'

const router = Router()

router.delete('/:group/:id', async (req: Request, res: Response) => {
  const groupInstance = await searchGroupByField('id', req.params.id)

  if (!groupInstance) {
    throw new BadRequestError("Can't found this ID in database")
  }

  await deleteGroup(groupInstance)
  return res.json({})
})

export { router as groupDeleteRouter }
