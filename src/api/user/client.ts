import { Endpoint } from '../../core/endpoint'
import type { ImportApiResponse } from '../../typings/utility'
import type { RequestAddUser, RequestUpdateUserGroups, ResponseUser } from './types'

export class UserApi extends Endpoint {
  addUser(user: RequestAddUser): Promise<ImportApiResponse<ResponseUser>> {
    return this.rest.post<ImportApiResponse<ResponseUser>>({
      url: '/pl/api/users',
      action: 'add',
      params: user,
    })
  }

  updateGroups(user: RequestUpdateUserGroups): Promise<ImportApiResponse<ResponseUser>> {
    return this.rest.post<ImportApiResponse<ResponseUser>>({
      url: '/pl/api/users',
      action: 'update',
      params: user,
    })
  }
}
