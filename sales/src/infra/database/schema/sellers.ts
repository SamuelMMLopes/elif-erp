import { pgEnum, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core'

import { organizations } from './organizations'
import { users } from './users'

export const sellerTypeEnum = pgEnum('seller_type', ['individual', 'corporate'])

export const sellers = pgTable(
  'sellers',
  {
    id: text('id').primaryKey(),
    type: sellerTypeEnum('type').notNull(),
    document: text('document').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    unique: unique().on(table.userId, table.organizationId),
  }),
)
