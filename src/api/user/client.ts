import { Endpoint } from '../../core/endpoint'
import type { ImportApiResponse } from '../../typings/utility'
import type { RequestAddUser, RequestUpdateUserGroups, ResponseUser } from './types'

export class UserApi extends Endpoint {
  /**
   * Создание пользователя в GetCourse
   * @param {RequestAddUser} user Информация о пользователе
   * @returns {ImportApiResponse<ResponseUser>} Созданный пользователь
   */
  addUser(user: RequestAddUser): Promise<ImportApiResponse<ResponseUser>> {
    return this.rest.post<ImportApiResponse<ResponseUser>>({
      url: '/pl/api/users',
      action: 'add',
      params: user,
    })
  }

  /**
   * Управление группами пользователя в GetCourse
   *
   * В результате выполнения запроса пользователь будет состоять во всех группах, указанных в списке group_name.
   *
   * Если ранее пользователь состоял в каких-либо группах, не указанных в group_name — он будет удален из этих групп.
   * @param {RequestAddUser} user ID пользователя и список групп
   * @returns {ImportApiResponse<ResponseUser>} Обновленный пользователь
   */
  updateGroups(user: RequestUpdateUserGroups): Promise<ImportApiResponse<ResponseUser>> {
    return this.rest.post<ImportApiResponse<ResponseUser>>({
      url: '/pl/api/users',
      action: 'update',
      params: user,
    })
  }
}
