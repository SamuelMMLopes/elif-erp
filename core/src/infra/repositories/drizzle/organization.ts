import type { OrganizationRepository } from '@/application/contracts/repositories'
import { Organization } from '@/domain/entities'
import { db } from '@/infra/database/connection'
import { organizations } from '@/infra/database/schema'

export class DrizzleOrganizationRepository implements OrganizationRepository {
  async create(organization: Organization): Promise<void> {
    await db.insert(organizations).values(organization)
  }

  async findByEmail(email: string = ''): Promise<Organization | null> {
    const rawOrganization = await db.query.organizations.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })
    if (!rawOrganization) {
      return null
    }
    return Organization.restore(rawOrganization)
  }

  async findById(id: string = ''): Promise<Organization | null> {
    const rawOrganization = await db.query.organizations.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id)
      },
    })
    if (!rawOrganization) {
      return null
    }
    return Organization.restore(rawOrganization)
  }
}
