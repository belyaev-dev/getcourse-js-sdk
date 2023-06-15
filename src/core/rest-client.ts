import { Buffer } from 'node:buffer'
import { HttpError } from '../errors/HttpError'
import { ServerError } from '../errors/ServerError'
import { TokenError } from '../errors/TokenError'
import { FormatError } from '../errors/FormatError'
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
    this.options = options ?? { request_delay: 150 }
    this.base_url = `https://${account_name}`
    this.queue = new AsyncQueue<Response>(this.options.request_delay)
  }

  private async checkToken(): Promise<void> {
    if (!this.access_token)
      throw new TokenError('No access token provided')
  }

  private async checkError(res: Response): Promise<void> {
    if (res.ok !== false && res.status !== 204)
      return
    if (res.status === 400) {
      throw new FormatError(
        res.body ? await res.json() : 'Error',
        `${res.status} ${res.statusText}, ${res.url}`,
      )
    }
    else if (res.status === 401) {
      throw new TokenError(res.body ? await res.json() : 'Empty')
    }
    else if (res.status >= 500) {
      throw new ServerError(String(res.status))
    }
    else {
      throw new HttpError(
        res.body
          ? await res.text()
          : `${res.status} ${res.statusText}, ${res.url}`,
      )
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

    await this.checkError(res)
    return res.body ? ((await res.json()) as T) : (null as T)
  }

  post<T>(init: RequestInit): Promise<T> {
    return this.request<T>('POST', init)
  }
}
