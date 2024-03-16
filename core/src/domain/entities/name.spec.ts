import { describe, expect, it } from 'bun:test'

import { Name } from './name'

describe('Name', () => {
  it('should return true if it is a valid name', () => {
    expect(Name.isValid('Any Name')).toBeTrue()
  })

  it.each(['A', null, undefined, true, 1])(
    'should return false if it is an invalid name',
    (invalidName) => {
      expect(Name.isValid(invalidName)).toBeFalse()
    },
  )
})
