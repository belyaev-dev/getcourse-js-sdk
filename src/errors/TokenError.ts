import type { JSONValue } from '../typings/utility'

export class TokenError extends Error {
  constructor(public response: JSONValue) {
    super()
  }
}
