import { DrizzleOrganizationRepository } from '@/infra/repositories/drizzle'

export const makeDrizzleOrganizationRepository =
  (): DrizzleOrganizationRepository => {
    return new DrizzleOrganizationRepository()
  }
