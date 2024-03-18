import type { OrganizationRepository } from '@/application/contracts/repositories'
import type { Organization } from '@/domain/entities'
import { db } from '@/infra/database/connection'
import { organizations } from '@/infra/database/schema'

export class DrizzleOrganizationRepository implements OrganizationRepository {
  async create(organization: Organization): Promise<void> {
    await db.insert(organizations).values(organization)
  }

  async findById(id: string = ''): Promise<Organization | null> {
    const organization = await db.query.organizations.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id)
      },
    })
    return organization || null
  }
}
