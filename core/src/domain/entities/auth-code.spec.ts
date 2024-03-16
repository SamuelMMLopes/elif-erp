import { describe, expect, it, setSystemTime } from 'bun:test'
import dayjs from 'dayjs'

import { AuthCode } from './auth-code'

describe('AuthCode', () => {
  it('should return true if the code was generated more than 15 minutes ago', () => {
    setSystemTime(dayjs().subtract(16, 'minute').toDate())
    const authCode = AuthCode.create({ userId: 'any_user_id' })
    setSystemTime()
    expect(authCode.isExpired()).toBeTrue()
  })

  it('should always generate a code with 6 characters', () => {
    const authCode = AuthCode.create({ userId: 'any_user_id' })
    expect(authCode.code).toHaveLength(6)
  })
})
