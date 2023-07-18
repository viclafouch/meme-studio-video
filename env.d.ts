declare namespace NodeJS {
  interface ProcessEnv {
    REMOTION_SERVE_URL: string
    REMOTION_REGION: string
    REMOTION_BUCKET_NAME: string
    REMOTION_FUNCTION_NAME: string
    MONGODB_URI: string
    MONGODB_DB: string
  }
}
