import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).url(),
  API_PORT: z.coerce.number(),
  JWT_PUBLIC_KEY_IN_BASE_64: z.string().min(1),
  QUEUE_URL: z.string().min(1).url(),
})

export const env = envSchema.parse(process.env)
