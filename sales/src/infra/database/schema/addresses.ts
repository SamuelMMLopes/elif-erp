import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { customers } from './customers'

export const addressTypeEnum = pgEnum('address_type', [
  'billing',
  'comercial',
  'delivery',
])

export const addresses = pgTable('addresses', {
  id: text('id').primaryKey(),
  street: text('street').notNull(),
  neighborhood: text('neighborhood').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipCode: text('zip_code').notNull(),
  type: addressTypeEnum('type').notNull(),
  complement: text('complement'),
  customerId: text('customer_id')
    .notNull()
    .references(() => customers.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
