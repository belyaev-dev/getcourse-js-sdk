import { Buffer } from 'node:buffer'
import { FormatError, HttpError, ServerError, TokenError } from '../errors'
import type { HttpMethod, Options, RequestInit } from '../typings/lib'
import { AsyncQueue } from './async-queue'

export class RestClient {
  private queue: AsyncQueue<Response>
  private base_url: string
  private options: Options

  constructor(
    account_name: string,
    private access_token: string,
    options?: Options,
  ) {
    this.options = { request_delay: 150, ...options }
    this.base_url = `https://${account_name}`
    this.queue = new AsyncQueue<Response>(this.options.request_delay)
  }

  private async checkToken(): Promise<void> {
    if (!this.access_token)
      throw new TokenError('No access token provided')
  }

  private async handleHTTPError(res: Response, parsedBody: any): Promise<void> {
    if (res.status === 400) {
      throw new FormatError(
        this.extractErrorMessage(parsedBody),
        `${res.status} ${res.statusText}, ${res.url}`,
      )
    }
    else if (res.status === 401) {
      throw new TokenError(this.extractErrorMessage(parsedBody, 'Empty'))
    }
    else if (res.status >= 500) {
      throw new ServerError(String(res.status))
    }
    else {
      throw new HttpError(
        this.extractErrorMessage(parsedBody, `${res.status} ${res.statusText}, ${res.url}`),
      )
    }
  }

  private extractErrorMessage(parsedBody: any, defaultMsg?: string): string {
    if (typeof parsedBody === 'object' && parsedBody !== null) {
      if (parsedBody.error_message)
        return parsedBody.error_message
      if (parsedBody.result && parsedBody.result.error_message)
        return parsedBody.result.error_message
      if (parsedBody.error)
        return parsedBody.error
    }
    return defaultMsg || 'Unknown Error'
  }

  private async validateResponse(res: Response, body: any): Promise<void> {
    if (!res.ok || res.status === 204) {
      this.handleHTTPError(res, body)
      return
    }

    if (body.success === false) {
      if (body.error === 'Неавторизованное API-обращение')
        throw new TokenError(body.error)

      if (body.error === true && body.error_message)
        throw new FormatError(body.error_message)

      const errorMessage = body.error || 'Unknown API Error'

      throw new HttpError(errorMessage)
    }
    if (body.result && body.result.success === false) {
      if (
        body.result?.error === true
          && body.result?.error_message
      )
        throw new FormatError(body.result?.error_message)
    }
  }

  async request<T>(method: HttpMethod, init: RequestInit): Promise<T> {
    await this.checkToken()
    const target = `${this.base_url}${init.url}${
      init.query ? `?${init.query}` : ''
    }`

    const encodedParams = init.params
      ? Buffer.from(JSON.stringify(init.params)).toString('base64')
      : undefined

    const bodyData = new URLSearchParams({
      key: this.access_token,
      ...(init.action && { action: init.action }),
      ...(encodedParams && { params: encodedParams }),
    }).toString()

    const res = await this.queue.push(fetch, target, {
      method,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bodyData,
    })

    const parsedBody = res.body ? ((await res.json()) as T) : (null as T)
    await this.validateResponse(res, parsedBody)

    return parsedBody
  }

  post<T>(init: RequestInit): Promise<T> {
    return this.request<T>('POST', init)
  }
}
