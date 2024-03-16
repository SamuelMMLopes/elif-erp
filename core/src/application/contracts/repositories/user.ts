import type { User } from '@/domain/entities'

export interface UserRepository {
  create: (user: User) => Promise<void>
  findByUsername: (username: string) => Promise<User | null>
  findOrganizationOwner: (organizationId: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
}
