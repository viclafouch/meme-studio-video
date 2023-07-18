import { z } from 'zod'
import { AwsRegion } from '@remotion/lambda'

const remotionConfigSchema = z.object({
  serveUrl: z.string().nonempty(),
  region: z.string().nonempty(),
  functionName: z.string().nonempty(),
  codec: z.string().nonempty(),
  bucketName: z.string().nonempty(),
  privacy: z.string().nonempty()
})

export type RemotionConfig = z.infer<typeof remotionConfigSchema>

export const remotionConfig = {
  serveUrl: process.env.REMOTION_SERVE_URL,
  bucketName: process.env.REMOTION_BUCKET_NAME,
  region: process.env.REMOTION_REGION as AwsRegion,
  functionName: process.env.REMOTION_FUNCTION_NAME,
  codec: 'h264',
  privacy: 'public'
} as const satisfies RemotionConfig

remotionConfigSchema.parse(remotionConfig)
