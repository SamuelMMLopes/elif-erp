import { ulid } from 'ulid'

import { UserCreatedEvent } from '@/domain/events'
import { type Either, Entity, left, right } from '@/shared/core'
import { InvalidFieldError } from '@/shared/errors'

import { Email } from './email'
import { Name } from './name'
import { Username } from './username'

type CreateInput = {
  name: string
  email: string
  username: string
  organizationId: string
  isOrganizationOwner: boolean
  organizationSlug: string
}

type RestoreInput = {
  id: string
  name: string
  email: string
  username: string
  organizationId: string
  isOrganizationOwner: boolean
}

export class User extends Entity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly username: string,
    readonly organizationId: string,
    readonly isOrganizationOwner: boolean,
  ) {
    super()
  }

  /* get username(): string {
    return this._username.value
  } */

  static create({
    name,
    email,
    username,
    organizationId,
    isOrganizationOwner,
    organizationSlug,
  }: CreateInput): Either<InvalidFieldError[], User> {
    const errors: InvalidFieldError[] = []
    if (!Name.isValid(name)) {
      errors.push(new InvalidFieldError('name'))
    }
    if (!Email.isValid(email)) {
      errors.push(new InvalidFieldError('email'))
    }
    const usernameOrError = Username.create({ username, organizationSlug })
    if (usernameOrError.isLeft()) {
      errors.push(usernameOrError.value)
    }
    if (errors.length > 0) {
      return left(errors)
    }
    const userId = ulid()
    const user = new User(
      userId,
      name,
      Email.format(email),
      (usernameOrError.value as Username).value,
      organizationId,
      isOrganizationOwner,
    )
    user.addDomainEvent(new UserCreatedEvent(user))
    return right(user)
  }

  static restore({
    id,
    name,
    email,
    username,
    organizationId,
    isOrganizationOwner,
  }: RestoreInput): User {
    return new User(
      id,
      name,
      email,
      username,
      organizationId,
      isOrganizationOwner,
    )
  }
}
