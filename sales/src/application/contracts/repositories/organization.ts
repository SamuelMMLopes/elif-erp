import type { Organization } from '@/domain/entities'

export interface OrganizationRepository {
  create: (organization: Organization) => Promise<void>
  findById: (id: string) => Promise<Organization | null>
}
