import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from './users'

export const authCodes = pgTable('auth_codes', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  code: text('code').notNull(),
  createdAt: timestamp('created_at').notNull(),
})
