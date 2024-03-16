import type { UserRepository } from '@/application/contracts/repositories'
import { User } from '@/domain/entities'
import { db } from '@/infra/database/connection'
import { users } from '@/infra/database/schema'

export class DrizzleUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    await db.insert(users).values(user)
  }

  async findByUsername(username: string = ''): Promise<User | null> {
    const rawUser = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.username, username)
      },
    })
    if (!rawUser) {
      return null
    }
    return User.restore(rawUser)
  }

  async findOrganizationOwner(
    organizationId: string = '',
  ): Promise<User | null> {
    const rawUser = await db.query.users.findFirst({
      where(fields, { and, eq }) {
        return and(
          eq(fields.isOrganizationOwner, true),
          eq(fields.organizationId, organizationId),
        )
      },
    })
    if (!rawUser) {
      return null
    }
    return User.restore(rawUser)
  }

  async findById(id: string = ''): Promise<User | null> {
    const rawUser = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id)
      },
    })
    if (!rawUser) {
      return null
    }
    return User.restore(rawUser)
  }
}
