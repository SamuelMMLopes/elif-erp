import { ulid } from 'ulid'
import { z } from 'zod'

import { type Either, left, right } from '@/shared/core'
import { CustomError, parseZodErrors } from '@/shared/errors'

const addressTypeEnum = z.enum(['billing', 'comercial', 'delivery'])

export type AddressType = z.infer<typeof addressTypeEnum>

const createSchema = z.object({
  customerId: z.string().min(1),
  street: z.string().min(5),
  neighborhood: z.string().min(3),
  city: z.string().min(5),
  state: z.string().min(2),
  zipCode: z.string().min(3),
  type: addressTypeEnum,
  complement: z.string().nullable().optional(),
})

type CreateInput = z.infer<typeof createSchema>

type RestoreInput = CreateInput & { id: string }

export class Address {
  private constructor(
    readonly id: string,
    readonly customerId: string,
    readonly street: string,
    readonly neighborhood: string,
    readonly city: string,
    readonly state: string,
    readonly zipCode: string,
    readonly type: AddressType,
    readonly complement?: string | null,
  ) {}

  static create({
    customerId,
    street,
    neighborhood,
    city,
    state,
    zipCode,
    type,
    complement,
  }: CreateInput): Either<CustomError[], Address> {
    const addressValidationOutput = createSchema.safeParse({
      customerId,
      street,
      neighborhood,
      city,
      state,
      zipCode,
      type,
      complement,
    })
    if (!addressValidationOutput.success) {
      return left(parseZodErrors(addressValidationOutput.error))
    }
    const addressId = ulid()
    const address = new Address(
      addressId,
      customerId,
      street,
      neighborhood,
      city,
      state,
      zipCode,
      type,
      complement,
    )
    return right(address)
  }

  static restore({
    id,
    customerId,
    street,
    neighborhood,
    city,
    state,
    zipCode,
    type,
    complement,
  }: RestoreInput): Address {
    return new Address(
      id,
      customerId,
      street,
      neighborhood,
      city,
      state,
      zipCode,
      type,
      complement,
    )
  }
}
