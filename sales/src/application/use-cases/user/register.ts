import type { UserDao } from '@/application/contracts/daos'
import { type Either, left, right } from '@/shared/core'
import { CustomError } from '@/shared/errors'

type Input = {
  id: string
}

type Output = Either<CustomError, undefined>

export class RegisterUserUseCase {
  constructor(private readonly userDao: UserDao) {}

  async execute({ id }: Input): Promise<Output> {
    const userWithSameId = await this.userDao.findById(id)
    if (userWithSameId) {
      return left(new CustomError('User already exists'))
    }
    await this.userDao.create({ id })
    return right(undefined)
  }
}
