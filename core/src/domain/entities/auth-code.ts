import dayjs from 'dayjs'
import { ulid } from 'ulid'

type CreateInput = {
  userId: string
}

type RestoreInput = {
  id: string
  userId: string
  code: string
  createdAt: Date
}

export class AuthCode {
  private readonly maxAgeInMinutes = 15

  private constructor(
    readonly id: string,
    readonly userId: string,
    readonly code: string,
    readonly createdAt: Date,
  ) {
    Object.freeze(this)
  }

  isExpired(): boolean {
    return dayjs().diff(this.createdAt, 'minute') > this.maxAgeInMinutes
  }

  static create({ userId }: CreateInput): AuthCode {
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000)
    const authCodeId = ulid()
    return new AuthCode(
      authCodeId,
      userId,
      randomSixDigitNumber.toString(),
      new Date(),
    )
  }

  static restore({ id, userId, code, createdAt }: RestoreInput): AuthCode {
    return new AuthCode(id, userId, code, createdAt)
  }
}
