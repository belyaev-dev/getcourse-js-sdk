export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

export type ImportApiResponse<T> = {
  success: boolean
  action: string
  result: T
}

export type ExportApiResponse<T> = {
  success: boolean
  info: T
  error_message: string
  error: boolean
  error_code?: number
}
