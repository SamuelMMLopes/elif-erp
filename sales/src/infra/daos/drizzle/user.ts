import type { UserDao } from '@/application/contracts/daos'
import { db } from '@/infra/database/connection'
import { users } from '@/infra/database/schema'

export class DrizzleUserDao implements UserDao {
  async create(user: UserDao.User): Promise<void> {
    await db.insert(users).values(user)
  }

  async findById(id: string = ''): Promise<UserDao.User | null> {
    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id)
      },
    })
    return user || null
  }
}
