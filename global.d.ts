declare global {
  namespace NodeJs {
    interface ProcessEnv {
      PORT: number
      MONGO_DB_USER: string
      MONGO_DB_PASSWORD: string
      MONGO_DB_CLUSTER: string
      MONGO_DB_DBNAME: string
      MONGO_DB_ATLAS_CODE: string
    }
  }
}

export {}
