import { Request, Response, Router } from 'express'
import {
  searchGroupByField,
  createGroup,
  updateGroup,
} from '../redis'
import { formatResponse } from '../helpers'
import { BadRequestError } from '../errors/badRequestError'

const router = Router()

router.post('/:group/:id', async (req: Request, res: Response, next) => {
  const groupInstance = await searchGroupByField('id', req.params.id)

  if (groupInstance) {
    if (groupInstance.group !== req.params.group) {
      throw new BadRequestError('This ID belongs to another group')
    }
    await updateGroup(groupInstance)
    return res.json(formatResponse(groupInstance))
  }

  const newGroupInstance = await createGroup({
      id: req.params.id,
      group: req.params.group,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      meta: req.body ? JSON.stringify(req.body) : '',
})

  res.json(formatResponse(newGroupInstance))
})

export { router as groupCreateRouter }
