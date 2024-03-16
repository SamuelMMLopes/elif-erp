import { type Either, left, right } from '@/shared/core'
import { InvalidFieldError } from '@/shared/errors'

type CreateInput = {
  username: string
  organizationSlug: string
}

export class Username {
  private static readonly usernameRegex = /^[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$/

  private constructor(readonly value: string) {
    Object.freeze(this)
  }

  static create({
    username,
    organizationSlug,
  }: CreateInput): Either<InvalidFieldError, Username> {
    if (
      typeof username !== 'string' ||
      username.length < 3 ||
      !this.usernameRegex.test(username)
    ) {
      return left(new InvalidFieldError('username'))
    }
    return right(new Username(`${username.toLowerCase()}@${organizationSlug}`))
  }

  static restore(username: string): Username {
    return new Username(username)
  }
}
