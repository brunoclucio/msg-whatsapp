import z from 'zod'

const envSchema = z.object({
  INSTANCE_ID: z.string(),
  INSTANCE_TOKEN: z.string(),
  CLIENT_TOKEN: z.string(),
  // BASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
