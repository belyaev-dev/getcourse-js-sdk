export interface Options {
  request_delay: number
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type GetCourseAction = 'add' | 'update' | 'get'

export interface RequestInit {
  url: string
  url_base?: string
  query?: string
  action?: GetCourseAction
  params?: Record<string, unknown>
  headers?: Record<string, string | number | boolean>
}
