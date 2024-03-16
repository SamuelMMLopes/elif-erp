import { SendOrganizationWelcomeEmailUseCase } from '@/application/use-cases/organization'
import { makeJwtEncrypter } from '@/infra/factories/cryptography'
import { makeNodemailer } from '@/infra/factories/mailer'

export const makeSendOrganizationWelcomeEmailUseCase =
  (): SendOrganizationWelcomeEmailUseCase => {
    return new SendOrganizationWelcomeEmailUseCase(
      makeNodemailer(),
      makeJwtEncrypter(),
    )
  }
