import { RegisterCustomerUseCase } from '@/application/use-cases/customer'
import { makeDrizzleOrganizationDao } from '@/infra/factories/daos/drizzle'
import { makeDrizzleCustomerRepository } from '@/infra/factories/repositories/drizzle'

export const makeRegisterCustomerUseCase = (): RegisterCustomerUseCase => {
  return new RegisterCustomerUseCase(
    makeDrizzleCustomerRepository(),
    makeDrizzleOrganizationDao(),
  )
}
