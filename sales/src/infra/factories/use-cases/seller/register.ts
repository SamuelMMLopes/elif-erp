import { RegisterSellerUseCase } from '@/application/use-cases/seller'
import {
  makeDrizzleOrganizationDao,
  makeDrizzleUserDao,
} from '@/infra/factories/daos/drizzle'
import { makeDrizzleSellerRepository } from '@/infra/factories/repositories/drizzle'

export const makeRegisterSellerUseCase = (): RegisterSellerUseCase => {
  return new RegisterSellerUseCase(
    makeDrizzleSellerRepository(),
    makeDrizzleUserDao(),
    makeDrizzleOrganizationDao(),
  )
}
