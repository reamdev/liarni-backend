export type MongoLocalInstance = {
  INSTANCE: 'local'
  DBNAME: string
}

export type MongoAtlasInstance = {
  INSTANCE: 'atlas'
  USER: string
  PASSWORD: string
  CLUSTER: string
  DBNAME: string
  ATLAS_CODE: string
}
