import { ulid } from 'ulid'

import { CustomerCreatedEvent } from '@/domain/events'
import { type Either, Entity, left, right } from '@/shared/core'
import { type CustomError, InvalidFieldError } from '@/shared/errors'

import { type Document, DocumentFactory } from './document'
import { Name } from './name'

export type CustomerType = 'individual' | 'corporate'

type CreateInput = {
  name: string
  type: CustomerType
  document: string
  organizationId: string
}

type RestoreInput = {
  id: string
  name: string
  type: CustomerType
  document: string
  organizationId: string
}

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
  }: CreateInput): Either<CustomError[], Customer> {
    const errors: CustomError[] = []
    if (!Name.isValid(name)) {
      errors.push(new InvalidFieldError('name'))
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
    const formattedDocument = (documentOrError.value as Document).value
    const customerId = ulid()
    const customer = new Customer(
      customerId,
      name,
      type,
      formattedDocument,
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
