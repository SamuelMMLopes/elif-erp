import { z } from 'zod'

const envSchema = z.object({
  QUEUE_URL: z.string().min(1).url(),
})

export const env = envSchema.parse(process.env)
