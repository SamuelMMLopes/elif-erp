import type { Config } from 'drizzle-kit'

import { env } from '@/infra/env'

export default {
  schema: './src/infra/database/schema/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config
