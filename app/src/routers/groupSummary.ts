import { Request, Response, Router } from 'express'
import { getAllGroups } from '../redis'

interface GroupSummary {
  group: string
  instances: number
  lastUpdatedAt: number
  createdAt: number
}

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const groupInstances = await getAllGroups()

  const result = groupInstances.reduce<Record<string, GroupSummary>>(
    (acc, { group, createdAt, updatedAt }) => {
      acc[group] ??= {
        group,
        instances: 0,
        lastUpdatedAt: updatedAt,
        createdAt,
      }

      acc[group].instances += 1

      if (acc[group].lastUpdatedAt < updatedAt) {
        acc[group].lastUpdatedAt = updatedAt
      }

      if (acc[group].createdAt > createdAt) {
        acc[group].createdAt = createdAt
      }

      return acc
    },
    {}
  )

  res.json(Object.values(result))
})

export { router as groupSummaryRouter }
