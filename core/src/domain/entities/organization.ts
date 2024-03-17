import { ulid } from 'ulid'
import { z } from 'zod'

import { OrganizationCreatedEvent } from '@/domain/events'
import { type Either, Entity, left, right } from '@/shared/core'
import { InvalidFieldError, parseZodErrors } from '@/shared/errors'

import { DocumentFactory } from './document'
import { OrganizationSlug } from './organization-slug'

const organizationTypeEnum = z.enum(['individual', 'corporate'])

export type OrganizationType = z.infer<typeof organizationTypeEnum>

const createSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(1).email(),
  type: organizationTypeEnum,
  document: z.string(),
})

type CreateInput = z.infer<typeof createSchema>

type RestoreInput = { id: string; slug: string } & CreateInput

export class Organization extends Entity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly type: OrganizationType,
    readonly document: string,
    readonly slug: string,
  ) {
    super()
  }

  static create({
    name,
    email,
    type,
    document,
  }: CreateInput): Either<InvalidFieldError[], Organization> {
    const errors: InvalidFieldError[] = []
    const organizationValidationOutput = createSchema.safeParse({
      name,
      email,
      type,
      document,
    })
    if (!organizationValidationOutput.success) {
      errors.concat(parseZodErrors(organizationValidationOutput.error))
    }
    const documentOrError = DocumentFactory.create({
      document,
      customerType: type,
    })
    if (documentOrError.isLeft()) {
      errors.push(documentOrError.value)
    }
    if (errors.length > 0) {
      return left(errors)
    }
    const organizationId = ulid()
    const organization = new Organization(
      organizationId,
      name,
      email,
      type,
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
    type,
    document,
    slug,
  }: RestoreInput): Organization {
    return new Organization(id, name, email, type, document, slug)
  }
}
