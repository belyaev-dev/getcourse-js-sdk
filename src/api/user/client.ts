import { Endpoint } from "../../core/endpoint";
import { RequestAddUser, RequestUpdateUserGroups } from "./types";

export class UserApi extends Endpoint {
  addUser(user: RequestAddUser): Promise<any> {
    return this.rest.post<any>({
      url: "/pl/api/users",
      action: "add",
      params: user,
    });
  }

  updateGroups(user: RequestUpdateUserGroups): Promise<any> {
    return this.rest.post<any>({
      url: "/pl/api/users",
      action: "update",
      params: user,
    });
  }
}
