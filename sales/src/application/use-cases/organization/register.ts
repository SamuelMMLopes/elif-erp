import type { OrganizationDao } from '@/application/contracts/daos'
import { type Either, left, right } from '@/shared/core'
import { CustomError } from '@/shared/errors'

type Input = {
  id: string
}

type Output = Either<CustomError, undefined>

export class RegisterOrganizationUseCase {
  constructor(private readonly organizationDao: OrganizationDao) {}

  async execute({ id }: Input): Promise<Output> {
    const organizationWithSameId = await this.organizationDao.findById(id)
    if (organizationWithSameId) {
      return left(new CustomError('Organization already exists'))
    }
    await this.organizationDao.create({ id })
    return right(undefined)
  }
}
