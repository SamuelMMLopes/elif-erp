import { DrizzleCustomerRepository } from '@/infra/repositories/drizzle'

export const makeDrizzleCustomerRepository = (): DrizzleCustomerRepository => {
  return new DrizzleCustomerRepository()
}
