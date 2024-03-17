import { ulid } from 'ulid'
import { z } from 'zod'

import { UserCreatedEvent } from '@/domain/events'
import { type Either, Entity, left, right } from '@/shared/core'
import { InvalidFieldError, parseZodErrors } from '@/shared/errors'

import { Username } from './username'

const createSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(1).email(),
  username: z.string(),
  organizationId: z.string().min(1),
  isOrganizationOwner: z.boolean(),
  organizationSlug: z.string().min(1),
})

type CreateInput = z.infer<typeof createSchema>

type RestoreInput = { id: string } & Omit<CreateInput, 'organizationSlug'>

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
    const userValidationOutput = createSchema.safeParse({
      name,
      email,
      username,
      organizationId,
      isOrganizationOwner,
      organizationSlug,
    })
    if (!userValidationOutput.success) {
      errors.concat(parseZodErrors(userValidationOutput.error))
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
      email,
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
