export interface MongoLocalInstance {
  INSTANCE: 'local'
  DBNAME: string
}

export interface MongoAtlasInstance {
  INSTANCE: 'atlas'
  USER: string
  PASSWORD: string
  CLUSTER: string
  DBNAME: string
  ATLAS_CODE: string
}
