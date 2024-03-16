import type {
  OrganizationRepository,
  UserRepository,
} from '@/application/contracts/repositories'
import { User } from '@/domain/entities'
import { type Either, left, right } from '@/shared/core'
import { CustomError, ResourceNotFoundError } from '@/shared/errors'
import { DomainEvents } from '@/shared/events'

type Input = {
  name: string
  email: string
  username: string
  organizationId: string
  isOrganizationOwner?: boolean
}

type Output = Either<CustomError[], { id: string }>

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute({
    name,
    email,
    username,
    organizationId,
    isOrganizationOwner = false,
  }: Input): Promise<Output> {
    if (isOrganizationOwner) {
      const organizationOwner =
        await this.userRepository.findOrganizationOwner(organizationId)
      if (organizationOwner) {
        return left([new CustomError('The organization already has an owner')])
      }
    }
    const organization =
      await this.organizationRepository.findById(organizationId)
    if (!organization) {
      return left([new ResourceNotFoundError('organization')])
    }
    const userWithSameUsername = await this.userRepository.findByUsername(
      `${username}@${organization.slug}`,
    )
    if (userWithSameUsername) {
      return left([new CustomError('User already exists')])
    }
    const userOrErrors = User.create({
      name,
      email,
      username,
      organizationId,
      isOrganizationOwner,
      organizationSlug: organization.slug,
    })
    if (userOrErrors.isLeft()) {
      return left(userOrErrors.value)
    }
    await this.userRepository.create(userOrErrors.value)
    DomainEvents.dispatchEventsForEntity(userOrErrors.value.id)
    return right({ id: userOrErrors.value.id })
  }
}
