import { RegisterAddressUseCase } from '@/application/use-cases/address'
import { makeDrizzleAddressRepository } from '@/infra/factories/repositories/drizzle'

export const makeRegisterAddressUseCase = (): RegisterAddressUseCase => {
  return new RegisterAddressUseCase(makeDrizzleAddressRepository())
}
