declare global {
  namespace NodeJs {
    interface ProcessEnv {
      PORT: number
      MONGO_DB_INSTANCE: string
      MONGO_DB_DBNAME: string
      MONGO_DB_USER: string
      MONGO_DB_PASSWORD: string
      MONGO_DB_CLUSTER: string
      MONGO_DB_ATLAS_CODE: string
      JWT_SECRET_KEY: string
    }
  }
}

export {}
