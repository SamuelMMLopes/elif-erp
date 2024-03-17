import type {
  AddressRepository,
  CustomerRepository,
} from '@/application/contracts/repositories'
import { Address, type AddressType } from '@/domain/entities/address'
import { type Either, left, right } from '@/shared/core'
import { type CustomError, ResourceNotFoundError } from '@/shared/errors'

type Input = {
  customerId: string
  street: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  type: AddressType
  complement?: string | null
}

type Output = Either<CustomError[], { id: string }>

export class RegisterAddressUseCase {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute({
    customerId,
    street,
    neighborhood,
    city,
    state,
    zipCode,
    type,
    complement,
  }: Input): Promise<Output> {
    const customer = await this.customerRepository.findById(customerId)
    if (!customer) {
      return left([new ResourceNotFoundError('customer')])
    }
    const addressOrErrors = Address.create({
      customerId,
      street,
      neighborhood,
      city,
      state,
      zipCode,
      type,
      complement,
    })
    if (addressOrErrors.isLeft()) {
      return left(addressOrErrors.value)
    }
    await this.addressRepository.create(addressOrErrors.value)
    return right({ id: addressOrErrors.value.id })
  }
}
