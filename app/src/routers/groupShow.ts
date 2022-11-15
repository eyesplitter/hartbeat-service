import { Request, Response, Router } from 'express'
import { searchGroupsByField } from '../redis'
import { formatResponse } from '../helpers'

const router = Router()

router.get('/:group/', async (req: Request, res: Response) => {
  const groupInstances = await searchGroupsByField('group', req.params.group)

  const formattedGroupInstances = groupInstances.map((groupInstance) =>
    formatResponse(groupInstance)
  )
  res.json(formattedGroupInstances)
})

export { router as groupShowRouter }
