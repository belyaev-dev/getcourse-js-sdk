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
  success: true
  action: string
  result: T
  /**
   * Сообщение об ошибке
   * @example Неавторизованное API-обращение
   */
  error?: string
}

export type ExportApiResponse<T> = {
  success: boolean
  info: T
  /**
   * Сообщение об ошибке
   * @example Файл еще не создан
   * @example Объект не найден
   * @example Должен быть передан хотя бы один фильтр
   */
  error_message: string
  error: boolean
  error_code?: number
}
