import { RegisterOrganizationUseCase } from '@/application/use-cases/organization'
import { makeDrizzleOrganizationDao } from '@/infra/factories/daos/drizzle'

export const makeRegisterOrganizationUseCase =
  (): RegisterOrganizationUseCase => {
    return new RegisterOrganizationUseCase(makeDrizzleOrganizationDao())
  }
