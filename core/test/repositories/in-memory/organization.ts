import type { OrganizationRepository } from '@/application/contracts/repositories'
import type { Organization } from '@/domain/entities'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public organizations: Organization[] = []

  async create(organization: Organization): Promise<void> {
    this.organizations.push(organization)
  }

  async findById(id: unknown): Promise<Organization | null> {
    const organization = this.organizations.find(
      (currentOrganization) => currentOrganization.id === id,
    )
    return organization ?? null
  }

  async findByEmail(email: unknown): Promise<Organization | null> {
    const organization = this.organizations.find(
      (currentOrganization) => currentOrganization.email === email,
    )
    return organization ?? null
  }
}
