import type { User } from '@/domain/entities'

export interface UserRepository {
  create: (user: User) => Promise<void>
  findById: (id: string) => Promise<User | null>
}
