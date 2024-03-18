import type { OrganizationRepository } from '@/application/contracts/repositories'
import { type Either, left, right } from '@/shared/core'
import { CustomError } from '@/shared/errors'

type Input = {
  id: string
  name: string
}

type Output = Either<CustomError, undefined>

export class RegisterOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute({ id, name }: Input): Promise<Output> {
    const organizationWithSameId =
      await this.organizationRepository.findById(id)
    if (organizationWithSameId) {
      return left(new CustomError('Organization already exists'))
    }
    await this.organizationRepository.create({ id, name })
    return right(undefined)
  }
}
