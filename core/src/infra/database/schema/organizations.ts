import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const organizationTypeEnum = pgEnum('organization_type', [
  'individual',
  'corporate',
])

export const organizations = pgTable('organizations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  document: text('document').notNull(),
  slug: text('slug').notNull(),
  type: organizationTypeEnum('type').notNull().default('individual'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
