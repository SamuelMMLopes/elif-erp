import { describe, expect, it } from 'bun:test'

import { Email } from './email'

describe('Email', () => {
  it('should return true if it is a valid email', () => {
    expect(Email.isValid('any_email@domain.com')).toBeTruthy()
  })

  it.each(['invalid_email', null, undefined, 1, true])(
    'should return false if it is an invalid email',
    (invalidEmail) => {
      expect(Email.isValid(invalidEmail)).toBeFalsy()
    },
  )

  it('should return the formatted email', () => {
    const unformattedEmail = 'AnyEmail@DOmain.com'
    expect(Email.format(unformattedEmail)).toBe('anyemail@domain.com')
  })
})
