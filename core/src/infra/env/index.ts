import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).url(),
  API_PORT: z.coerce.number(),
  EMAIL_FROM: z.string().min(1),
  EMAIL_HOST: z.string().min(1),
  EMAIL_PORT: z.coerce.number(),
  EMAIL_USER: z.string().min(1),
  EMAIL_PASSWORD: z.string().min(1),
  JWT_PRIVATE_KEY_IN_BASE_64: z.string().min(1),
  JWT_PUBLIC_KEY_IN_BASE_64: z.string().min(1),
  QUEUE_URL: z.string().min(1).url(),
})

export const env = envSchema.parse(process.env)
