import z from 'zod'

const envSchema = z.object({
  INSTANCE_ID: z.string().optional(),
  INSTANCE_TOKEN: z.string().optional(),
  CLIENT_TOKEN: z.string().optional(),
  // BASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
