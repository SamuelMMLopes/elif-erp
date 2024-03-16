import { AuthenticateUserFromCodeUseCase } from '@/application/use-cases/user'
import { makeJwtEncrypter } from '@/infra/factories/cryptography'
import {
  makeDrizzleAuthCodeRepository,
  makeDrizzleUserRepository,
} from '@/infra/factories/repositories/drizzle'

export const makeAuthenticateUserFromCodeUseCase =
  (): AuthenticateUserFromCodeUseCase => {
    return new AuthenticateUserFromCodeUseCase(
      makeDrizzleAuthCodeRepository(),
      makeDrizzleUserRepository(),
      makeJwtEncrypter(),
    )
  }
