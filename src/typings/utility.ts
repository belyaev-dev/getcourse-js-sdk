export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>

export type ApiResponse<T> = {
  success: boolean
  action: string
  result: T
}
