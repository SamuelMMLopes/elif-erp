import type { UserRepository } from '@/application/contracts/repositories'
import type { User } from '@/domain/entities'
import { db } from '@/infra/database/connection'
import { users } from '@/infra/database/schema'

export class DrizzleUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    await db.insert(users).values(user)
  }

  async findById(id: string = ''): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id)
      },
    })
    return user || null
  }
}
