import type { Encrypter } from '@/application/contracts/cryptography'
import type {
  AuthCodeRepository,
  UserRepository,
} from '@/application/contracts/repositories'
import { type Either, left, right } from '@/shared/core'
import { CustomError } from '@/shared/errors'

type Input = {
  code: string
}

type Output = Either<CustomError, { token: string }>

export class AuthenticateUserFromCodeUseCase {
  constructor(
    private readonly authCodeRepository: AuthCodeRepository,
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({ code }: Input): Promise<Output> {
    const authCode = await this.authCodeRepository.findByCode(code)
    if (!authCode || authCode.isExpired()) {
      return left(new CustomError('Unauthorized'))
    }
    const user = await this.userRepository.findById(authCode.userId)
    if (!user) {
      return left(new CustomError('Unauthorized'))
    }
    const token = await this.encrypter.encrypt({
      sub: user.id,
      organizationId: user.organizationId,
    })
    await this.authCodeRepository.deleteByCode(code)
    return right({ token })
  }
}
