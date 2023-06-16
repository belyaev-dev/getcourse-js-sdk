import { AccountApi } from './api/account/client'
import { DealApi } from './api/deal/client'
import { UserApi } from './api/user/client'
import { RestClient } from './core/rest-client'
import type { Options } from './typings/lib'

export * from './errors'

export class GetCourse {
  private rest: RestClient

  private _account: AccountApi
  private _user: UserApi
  private _deal: DealApi

  constructor(account_name: string, access_token: string, options?: Options) {
    this.rest = new RestClient(account_name, access_token, options)

    this._account = new AccountApi(this.rest)
    this._user = new UserApi(this.rest)
    this._deal = new DealApi(this.rest)
  }

  /** Методы API аккаунта - экспорт данных.
   * {@link https://getcourse.ru/help/api#export Документация Export API}
   */
  get account(): AccountApi {
    return this._account
  }

  /** API пользователей (создание, редактирование, добавление в группы)
   * {@link https://getcourse.ru/help/api#1 Документация API пользователей}
  */
  get user(): UserApi {
    return this._user
  }

  /** API заказов (создание, редактирование)
   * {@link https://getcourse.ru/help/api#2 Документация API заказов}
  */
  get deal(): DealApi {
    return this._deal
  }
}
