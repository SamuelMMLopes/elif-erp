import { SendUserAuthCodeEmailUseCase } from '@/application/use-cases/user'
import { makeNodemailer } from '@/infra/factories/mailer'
import {
  makeDrizzleAuthCodeRepository,
  makeDrizzleUserRepository,
} from '@/infra/factories/repositories/drizzle'

export const makeSendUserAuthCodeEmailUseCase =
  (): SendUserAuthCodeEmailUseCase => {
    return new SendUserAuthCodeEmailUseCase(
      makeDrizzleAuthCodeRepository(),
      makeDrizzleUserRepository(),
      makeNodemailer(),
    )
  }
