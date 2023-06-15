import { Endpoint } from '../../core/endpoint'
import type { ApiResponse } from '../../typings/utility'
import type { RequestAddDeal, RequestUpdateDealStatus, ResponseDeal } from './types'

export class DealApi extends Endpoint {
  addDeal(deal: RequestAddDeal): Promise<ApiResponse<ResponseDeal>> {
    return this.rest.post({
      url: '/pl/api/deals',
      action: 'add',
      params: deal,
    })
  }

  updateStatus(deal: RequestUpdateDealStatus): Promise<ApiResponse<ResponseDeal>> {
    return this.rest.post({
      url: '/pl/api/deals',
      action: 'add',
      params: deal,
    })
  }
}
