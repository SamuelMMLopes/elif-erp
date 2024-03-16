import type { UserRepository } from '@/application/contracts/repositories'
import type { User } from '@/domain/entities'

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find(
      (currentUser) => currentUser.username === username,
    )
    return user ?? null
  }

  async findOrganizationOwner(organizationId: string): Promise<User | null> {
    const user = this.users.find(
      (currentUser) => currentUser.organizationId === organizationId,
    )
    return user ?? null
  }
}
