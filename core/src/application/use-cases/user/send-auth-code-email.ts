import type { Mailer } from '@/application/contracts/mailer'
import type {
  AuthCodeRepository,
  UserRepository,
} from '@/application/contracts/repositories'
import { AuthCode } from '@/domain/entities'
import { type Either, left, right } from '@/shared/core'
import { CustomError } from '@/shared/errors'

type Input = {
  username: string
}

type Output = Either<CustomError, undefined>

export class SendUserAuthCodeEmailUseCase {
  constructor(
    private readonly authCodeRepository: AuthCodeRepository,
    private readonly userRepository: UserRepository,
    private readonly mailer: Mailer,
  ) {}

  async execute({ username }: Input): Promise<Output> {
    const user = await this.userRepository.findByUsername(username)
    if (!user) {
      return left(new CustomError('Unauthorized'))
    }
    const authCode = AuthCode.create({ userId: user.id })
    await this.authCodeRepository.create(authCode)
    await this.mailer.send({
      to: user.email,
      subject: 'Elif - Código de acesso',
      content: `Seu código de acesso é: ${authCode.code}`,
    })
    return right(undefined)
  }
}
