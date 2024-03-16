import { describe, expect, it } from 'bun:test'

import { InvalidFieldError } from '@/shared/errors'

import { Username } from './username'

describe('Username', () => {
  it('should return an instance of Username if it is a valid username', () => {
    const username = Username.create({
      username: 'johnDoe',
      organizationSlug: 'any_organization',
    }).value as Username
    expect(username.value).toBe('johndoe@any_organization')
  })

  it.each(['in', 'invalid username', null, undefined, 1, true])(
    'should return false if it is an invalid username',
    (invalidUsername) => {
      const error = Username.create({
        username: invalidUsername as any,
        organizationSlug: 'any_organization',
      })
      expect(error.isLeft()).toBeTrue()
      expect(error.value).toBeInstanceOf(InvalidFieldError)
    },
  )
})
