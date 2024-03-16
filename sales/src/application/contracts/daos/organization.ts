export namespace OrganizationDao {
  export type Organization = {
    id: string
  }
}

export interface OrganizationDao {
  create: (organization: OrganizationDao.Organization) => Promise<void>
  findById: (id: string) => Promise<OrganizationDao.Organization | null>
}
