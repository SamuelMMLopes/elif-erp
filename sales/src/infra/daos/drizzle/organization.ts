import type { OrganizationDao } from '@/application/contracts/daos'
import { db } from '@/infra/database/connection'
import { organizations } from '@/infra/database/schema'

export class DrizzleOrganizationDao implements OrganizationDao {
  async create(organization: OrganizationDao.Organization): Promise<void> {
    await db.insert(organizations).values(organization)
  }

  async findById(
    id: string = '',
  ): Promise<OrganizationDao.Organization | null> {
    const organization = await db.query.organizations.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id)
      },
    })
    return organization || null
  }
}
