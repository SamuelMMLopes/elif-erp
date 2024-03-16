import { boolean, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core'

import { organizations } from './organizations'

export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    username: text('username').notNull(),
    organizationId: text('organization_id')
      .references(() => organizations.id)
      .notNull(),
    isOrganizationOwner: boolean('is_organization_owner')
      .notNull()
      .default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    unique: unique().on(table.username, table.organizationId),
  }),
)
