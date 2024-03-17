import type { OrganizationRepository } from '@/application/contracts/repositories'
import { Organization, type OrganizationType } from '@/domain/entities'
import { type Either, left, right } from '@/shared/core'
import { CustomError } from '@/shared/errors'
import { DomainEvents } from '@/shared/events'

type Input = {
  name: string
  email: string
  type: OrganizationType
  document: string
}

type Output = Either<CustomError[], { id: string }>

export class RegisterOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute({ name, email, type, document }: Input): Promise<Output> {
    const organizationOrErrors = Organization.create({
      name,
      email,
      type,
      document,
    })
    if (organizationOrErrors.isLeft()) {
      return left(organizationOrErrors.value)
    }
    const organization = organizationOrErrors.value
    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(organization.email)
    if (organizationWithSameEmail) {
      return left([new CustomError('Organization already exists')])
    }
    await this.organizationRepository.create(organization)
    DomainEvents.dispatchEventsForEntity(organization.id)
    return right({ id: organization.id })
  }
}
