import type { OrganizationDao } from '@/application/contracts/daos'
import type { CustomerRepository } from '@/application/contracts/repositories'
import { Customer, type CustomerType } from '@/domain/entities'
import { type Either, left, right } from '@/shared/core'
import { CustomError, ResourceNotFoundError } from '@/shared/errors'
import { DomainEvents } from '@/shared/events'

type Input = {
  name: string
  type: CustomerType
  document: string
  organizationId: string
}

type Output = Either<CustomError[], { id: string }>

export class RegisterCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly organizationDao: OrganizationDao,
  ) {}

  async execute({
    name,
    type,
    document,
    organizationId,
  }: Input): Promise<Output> {
    const organization = await this.organizationDao.findById(organizationId)
    if (!organization) {
      return left([new ResourceNotFoundError('organization')])
    }
    const customerWithSameDocument =
      await this.customerRepository.findByDocument({ document, organizationId })
    if (customerWithSameDocument) {
      return left([new CustomError('Customer already exists')])
    }
    const customerOrErros = Customer.create({
      name,
      type,
      document,
      organizationId,
    })
    if (customerOrErros.isLeft()) {
      return left(customerOrErros.value)
    }
    await this.customerRepository.create(customerOrErros.value)
    DomainEvents.dispatchEventsForEntity(customerOrErros.value.id)
    return right({ id: customerOrErros.value.id })
  }
}
