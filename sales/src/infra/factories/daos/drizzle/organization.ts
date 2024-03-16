import { DrizzleOrganizationDao } from '@/infra/daos/drizzle'

export const makeDrizzleOrganizationDao = (): DrizzleOrganizationDao => {
  return new DrizzleOrganizationDao()
}
