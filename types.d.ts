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

/** Save the HTTP 1xx Error codes, to know more about them, check the following resource: https://kinsta.com/es/blog/codigos-de-estado-de-http/ */
export type StatusCode100 = 100 | 101 | 103
/** Save the HTTP 2xx Error codes, to know more about them, check the following resource: https://kinsta.com/es/blog/codigos-de-estado-de-http/ */
export type ResponseCode200 = 200 | 201 | 202 | 203 | 204 | 205 | 206
/** Save the HTTP 3xx Error codes, to know more about them, check the following resource: https://kinsta.com/es/blog/codigos-de-estado-de-http/ */
export type RedirectionCode300 = 300 | 301 | 302 | 303 | 304 | 307 | 308
/** Save the HTTP 4xx Error codes, to know more about them, check the following resource: https://kinsta.com/es/blog/codigos-de-estado-de-http/ */
export type ErrorStatusCode400 = 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 422 | 425 | 426 | 428 | 429 | 431 | 451 | 499
/** Save the HTTP 5xx Error codes, to know more about them, check the following resource: https://kinsta.com/es/blog/codigos-de-estado-de-http/ */
export type ErrorStatusCode500 = 500 | 501 | 502 | 503 | 504 | 505 | 508 | 511 | 521 | 525
