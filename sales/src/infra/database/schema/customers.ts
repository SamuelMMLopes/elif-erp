import { pgEnum, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core'

import { organizations } from './organizations'

export const customerTypeEnum = pgEnum('customer_type', [
  'individual',
  'corporate',
])

export const customers = pgTable(
  'customers',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    type: customerTypeEnum('type').notNull(),
    document: text('document').notNull(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    unique: unique().on(table.document, table.organizationId),
  }),
)
