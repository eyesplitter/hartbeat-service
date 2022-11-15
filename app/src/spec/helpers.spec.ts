import { strict as assert } from 'node:assert'
import { formatResponse } from '../helpers'
import { Group, GroupData, GroupSchema } from '../redis'

const rawData: GroupData = {
  id: 'testId',
  group: 'testGroup',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  meta: JSON.stringify({ foo: 'bar' }),
}
const group = new Group(GroupSchema, 'id', rawData)

describe('helpers', function () {
  it('should remove excess field', () => {
    const formattedGroup = formatResponse(group)
    assert.equal(formattedGroup.entityId, undefined)
  })

  it('should return meta property as a Json', () => {
    const formattedGroup = formatResponse(group)
    assert.deepEqual(formattedGroup.meta, { foo: 'bar' })
  })
})
