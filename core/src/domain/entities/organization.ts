import { ulid } from 'ulid'

import { OrganizationCreatedEvent } from '@/domain/events'
import { type Either, Entity, left, right } from '@/shared/core'
import { InvalidFieldError } from '@/shared/errors'

import { Email } from './email'
import { Name } from './name'
import { OrganizationSlug } from './organization-slug'

type CreateInput = {
  name: string
  email: string
  document: string
}

type RestoreInput = {
  id: string
  name: string
  email: string
  document: string
  slug: string
}

export class Organization extends Entity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly document: string,
    readonly slug: string,
  ) {
    super()
  }

  static create({
    name,
    email,
    document,
  }: CreateInput): Either<InvalidFieldError[], Organization> {
    const errors: InvalidFieldError[] = []
    if (!Name.isValid(name)) {
      errors.push(new InvalidFieldError('name'))
    }
    if (!Email.isValid(email)) {
      errors.push(new InvalidFieldError('email'))
    }
    if (errors.length > 0) {
      return left(errors)
    }
    const organizationId = ulid()
    const organization = new Organization(
      organizationId,
      name,
      Email.format(email),
      document,
      OrganizationSlug.generate(name),
    )
    organization.addDomainEvent(new OrganizationCreatedEvent(organization))
    return right(organization)
  }

  static restore({
    id,
    name,
    email,
    document,
    slug,
  }: RestoreInput): Organization {
    return new Organization(id, name, email, document, slug)
  }
}
