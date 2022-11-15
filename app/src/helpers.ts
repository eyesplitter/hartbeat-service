import { Group } from './redis'

export const formatResponse = (group: Group): Record<string, Group> => {
  const { entityId, meta, ...formattedGroup } = group.toJSON()

  if (group.meta) {
    formattedGroup.meta = JSON.parse(group.meta)
  }

  return formattedGroup
}
