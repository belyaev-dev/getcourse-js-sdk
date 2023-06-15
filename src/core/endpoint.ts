import type { RestClient } from './rest-client'

export class Endpoint {
  constructor(protected rest: RestClient) {}
}
