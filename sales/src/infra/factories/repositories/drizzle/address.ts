import { DrizzleAddressRepository } from '@/infra/repositories/drizzle'

export const makeDrizzleAddressRepository = (): DrizzleAddressRepository => {
  return new DrizzleAddressRepository()
}
