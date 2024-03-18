import { RegisterOrganizationUseCase } from '@/application/use-cases/organization'
import { makeDrizzleOrganizationRepository } from '@/infra/factories/repositories/drizzle'

export const makeRegisterOrganizationUseCase =
  (): RegisterOrganizationUseCase => {
    return new RegisterOrganizationUseCase(makeDrizzleOrganizationRepository())
  }
