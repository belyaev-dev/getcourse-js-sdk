import type { JSONValue } from '../typings/utility'

export class FormatError extends Error {
  constructor(public response: JSONValue) {
    super()
  }
}
