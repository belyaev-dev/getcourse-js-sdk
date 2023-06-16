import { Endpoint } from '../../core/endpoint'
import type { ImportApiResponse } from '../../typings/utility'
import type { RequestAddDeal, RequestUpdateDealStatus, ResponseDeal } from './types'

export class DealApi extends Endpoint {
  /**
   * Создание заказа в GetCourse
   * @param {RequestAddDeal} deal Информация о заказе и пользователе
   * @returns {ImportApiResponse<ResponseDeal>} Созданный заказ
   */
  addDeal(deal: RequestAddDeal): Promise<ImportApiResponse<ResponseDeal>> {
    return this.rest.post<ImportApiResponse<ResponseDeal>>({
      url: '/pl/api/deals',
      action: 'add',
      params: deal,
    })
  }

  /**
   * Изменить статус заказа
   *
   * Если заказ имеет статус «Завершён» и вы меняете статус при помощи API на любой другой, то активные покупки, связанные с заказом, не будут отменены.
   * То есть без изменения статуса покупки у пользователя сохранится доступ, выданный этой покупкой
   * @param {RequestUpdateDealStatus} deal Запрос на обновление статуса заказа
   * @returns {ImportApiResponse<ResponseDeal>} Обновленный заказ
   */
  updateStatus(deal: RequestUpdateDealStatus): Promise<ImportApiResponse<ResponseDeal>> {
    return this.rest.post<ImportApiResponse<ResponseDeal>>({
      url: '/pl/api/deals',
      action: 'add',
      params: deal,
    })
  }
}
