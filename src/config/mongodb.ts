import { z } from 'zod'

const mongoDbConfigSchema = z.object({
  uri: z.string().nonempty(),
  db: z.string().nonempty()
})

export type MongoDbConfig = z.infer<typeof mongoDbConfigSchema>

export const mongoDbConfig: MongoDbConfig = {
  uri: process.env.MONGODB_URI,
  db: process.env.MONGODB_DB
}

mongoDbConfigSchema.parse(mongoDbConfig)
