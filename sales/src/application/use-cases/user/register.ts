import type { UserRepository } from '@/application/contracts/repositories'
import { type Either, left, right } from '@/shared/core'
import { CustomError } from '@/shared/errors'

type Input = {
  id: string
  name: string
}

type Output = Either<CustomError, undefined>

export class RegisterUserUseCase {
  constructor(private readonly userRepUserRepository: UserRepository) {}

  async execute({ id, name }: Input): Promise<Output> {
    const userWithSameId = await this.userRepUserRepository.findById(id)
    if (userWithSameId) {
      return left(new CustomError('User already exists'))
    }
    await this.userRepUserRepository.create({ id, name })
    return right(undefined)
  }
}
