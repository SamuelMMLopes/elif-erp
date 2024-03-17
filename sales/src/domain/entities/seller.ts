import { ulid } from 'ulid'
import { z } from 'zod'

import { type Either, left, right } from '@/shared/core'
import { type InvalidFieldError, parseZodErrors } from '@/shared/errors'

import { DocumentFactory } from './document'

const sellerTypeEnum = z.enum(['individual', 'corporate'])

export type SellerType = z.infer<typeof sellerTypeEnum>

const createSchema = z.object({
  userId: z.string().min(1),
  organizationId: z.string().min(1),
  type: sellerTypeEnum,
  document: z.string(),
})

type CreateInput = z.infer<typeof createSchema>

type RestoreInput = { id: string } & CreateInput

export class Seller {
  private constructor(
    readonly id: string,
    readonly userId: string,
    readonly organizationId: string,
    readonly type: SellerType,
    readonly document: string,
  ) {}

  static create({
    userId,
    organizationId,
    type,
    document,
  }: CreateInput): Either<InvalidFieldError[], Seller> {
    const errors: InvalidFieldError[] = []
    const sellerValidationOutput = createSchema.safeParse({
      userId,
      organizationId,
      type,
      document,
    })
    if (!sellerValidationOutput.success) {
      errors.concat(parseZodErrors(sellerValidationOutput.error))
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
    const sellerId = ulid()
    const seller = new Seller(sellerId, userId, organizationId, type, document)
    return right(seller)
  }

  static restore({
    id,
    userId,
    organizationId,
    type,
    document,
  }: RestoreInput): Seller {
    return new Seller(id, userId, organizationId, type, document)
  }
}
