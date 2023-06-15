import { Endpoint } from "../../core/endpoint";
import { FilterLike } from "../../helpers/filter";
import { query } from "../../helpers/query";

export class AccountApi extends Endpoint {
  exportUsers(params?: { filter?: FilterLike<["status"], ["created_at"]> }) {
    return this.rest.post({
      url: "/pl/api/account/users",
    //   action: "get",
      query: query(params),
    });
  }

  exportGroups(params?: { filter?: FilterLike<["status"], ["created_at", "added_at"]> }) {
    return this.rest.post({
        url: "/pl/api/account/users",
        // action: "get",
        query: query(params),
      });
  }

  exportGroupUsers(group_id: number, params?: { filter?: FilterLike<["status"], ["created_at", "added_at"]> }) {
    return this.rest.post({
        url: `/pl/api/account/groups/${group_id}/users`,
        // action: "get",
        query: query(params),
      });
  }

  exportPayments(params?: { filter?: FilterLike<["status"], ["created_at", "status_changed_at"]> }) {
    return this.rest.post({
        url: "/pl/api/account/payments",
        // action: "get",
        query: query(params),
      });
  }

  getFields() {
    return this.rest.post({
        url: "/pl/api/account/fields",
        action: "get",
    })

  }

  getExportResult(export_id: number) {
    return this.rest.post({
        url: `/pl/api/account/exports/${export_id}`,
        // action: "get",
      });
  }
}
