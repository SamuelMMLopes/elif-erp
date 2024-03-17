import { ulid } from 'ulid'
import { z } from 'zod'

import { CustomerCreatedEvent } from '@/domain/events'
import { type Either, Entity, left, right } from '@/shared/core'
import { InvalidFieldError, parseZodErrors } from '@/shared/errors'

import { type Document, DocumentFactory } from './document'

const customerTypeEnum = z.enum(['individual', 'corporate'])

export type CustomerType = z.infer<typeof customerTypeEnum>

const createSchema = z.object({
  name: z.string().min(2),
  type: customerTypeEnum,
  document: z.string(),
  organizationId: z.string().min(1),
})

type CreateInput = z.infer<typeof createSchema>

type RestoreInput = { id: string } & CreateInput

export class Customer extends Entity {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly type: CustomerType,
    readonly document: string,
    readonly organizationId: string,
  ) {
    super()
  }

  static create({
    name,
    type,
    document,
    organizationId,
  }: CreateInput): Either<InvalidFieldError[], Customer> {
    const errors: InvalidFieldError[] = []
    const customerValidationOutput = createSchema.safeParse({
      name,
      type,
      document,
      organizationId,
    })
    if (!customerValidationOutput.success) {
      errors.concat(parseZodErrors(customerValidationOutput.error))
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
    const validatedDocument = (documentOrError.value as Document).value
    const customerId = ulid()
    const customer = new Customer(
      customerId,
      name,
      type,
      validatedDocument,
      organizationId,
    )
    customer.addDomainEvent(new CustomerCreatedEvent(customer))
    return right(customer)
  }

  static restore({
    id,
    name,
    type,
    document,
    organizationId,
  }: RestoreInput): Customer {
    return new Customer(id, name, type, document, organizationId)
  }
}
