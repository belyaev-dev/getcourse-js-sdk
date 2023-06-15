import { Endpoint } from "../../core/endpoint";
import { RequestAddDeal, RequestUpdateDealStatus } from "./types";

export class DealApi extends Endpoint {
  addDeal(deal: RequestAddDeal): Promise<any> {
    return this.rest.post({
      url: "/pl/api/deals",
      action: "add",
      params: deal,
    });
  }

  updateStatus(deal: RequestUpdateDealStatus): Promise<any> {
    return this.rest.post({
        url: "/pl/api/deals",
        action: "add",
        params: deal,
    })
  }
}
