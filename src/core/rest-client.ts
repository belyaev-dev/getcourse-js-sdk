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
    private account_name: string,
    private access_token: string,
    options?: Options,
  ) {
    this.options = options ?? { request_delay: 150 }
    this.base_url = `https://${this.account_name}`
    this.queue = new AsyncQueue<Response>(this.options.request_delay)
  }

  private async checkToken(): Promise<void> {
    if (!this.access_token)
      throw new TokenError()
  }

  private async checkError(res: Response): Promise<void> {
    if (res.ok !== false && res.status !== 204)
      return
    if (res.status === 400) {
      throw new FormatError()
    }
    else if (res.status === 401) {
      throw new TokenError()
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
    const target = `https://${this.base_url}.getcourse.ru/pl/api/${init.url}${init.query ? `?${init.query}` : ''}`

    const encodedParams = init.params ? btoa(JSON.stringify(init.params)) : undefined
    const bodyData = { key: this.access_token, action: init.action, params: encodedParams }

    const res = await this.queue.push(fetch, target, {
      method,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify(bodyData),
    })

    await this.checkError(res)
    return res.body ? ((await res.json()) as T) : (null as T)
  }

  post<T>(init: RequestInit): Promise<T> {
    return this.request<T>('POST', init)
  }
}
