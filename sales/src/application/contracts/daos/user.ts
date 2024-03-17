export namespace UserDao {
  export type User = {
    id: string
    name: string
  }
}

export interface UserDao {
  create: (user: UserDao.User) => Promise<void>
  findById: (id: string) => Promise<UserDao.User | null>
}
