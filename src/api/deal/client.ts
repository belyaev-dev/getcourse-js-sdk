import { Endpoint } from '../../core/endpoint'
import type { ImportApiResponse } from '../../typings/utility'
import type { RequestAddDeal, RequestUpdateDealStatus, ResponseDeal } from './types'

export class DealApi extends Endpoint {
  addDeal(deal: RequestAddDeal): Promise<ImportApiResponse<ResponseDeal>> {
    return this.rest.post<ImportApiResponse<ResponseDeal>>({
      url: '/pl/api/deals',
      action: 'add',
      params: deal,
    })
  }

  updateStatus(deal: RequestUpdateDealStatus): Promise<ImportApiResponse<ResponseDeal>> {
    return this.rest.post<ImportApiResponse<ResponseDeal>>({
      url: '/pl/api/deals',
      action: 'add',
      params: deal,
    })
  }
}
