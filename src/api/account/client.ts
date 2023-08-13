import { Endpoint } from '../../core/endpoint'
import { query } from '../../helpers/query'
import type {
  ExportApiResponse,
  RequireAtLeastOne,
} from './../../typings/utility'
import type {
  ExportInfo,
  ExportedData,
  FieldInfo,
  RequestExportDeals,
  RequestExportGroupsUsers,
  RequestExportPayments,
  RequestExportUsers,
} from './types'

export class AccountApi extends Endpoint {
  /** Выгрузка групп из GetCourse
   * @returns {ExportApiResponse<ExportInfo>} ID задачи на экспорт
   */
  getGroups(): Promise<ExportApiResponse<ExportInfo>> {
    return this.rest.post<ExportApiResponse<ExportInfo>>({
      url: '/pl/api/account/groups',
    })
  }

  /** Выгрузка полей из GetCourse
   * @returns {ExportApiResponse<FieldInfo[]>} Список полей
   */
  getFields(): Promise<ExportApiResponse<FieldInfo[]>> {
    return this.rest.post<ExportApiResponse<FieldInfo[]>>({
      url: '/pl/api/account/fields',
    })
  }

  /** Выгрузка пользователей из GetCourse */
  exportUsers(
    params: RequireAtLeastOne<RequestExportUsers>,
  ): Promise<ExportApiResponse<ExportInfo>> {
    return this.rest.post<ExportApiResponse<ExportInfo>>({
      url: '/pl/api/account/users',
      query: query(params),
    })
  }

  /** Выгрузка участников групп из GetCourse
   * @param {number} group_id ID группы
   * @param {RequestExportGroupsUsers=} params Фильтр
   * @returns {ExportApiResponse<ExportInfo>} ID задачи на экспорт
   */
  exportGroupUsers(
    group_id: number,
    params?: RequestExportGroupsUsers,
  ): Promise<ExportApiResponse<ExportInfo>> {
    return this.rest.post<ExportApiResponse<ExportInfo>>({
      url: `/pl/api/account/groups/${group_id}/users`,
      query: query(params),
    })
  }

  /** Выгрузка платежей из GetCourse
   * @param {RequireAtLeastOne<RequestExportPayments>} params Фильтр
   * @returns {ExportApiResponse<ExportInfo>} ID задачи на экспорт
   */
  exportPayments(
    params: RequireAtLeastOne<RequestExportPayments>,
  ): Promise<ExportApiResponse<ExportInfo>> {
    return this.rest.post<ExportApiResponse<ExportInfo>>({
      url: '/pl/api/account/payments',
      query: query(params),
    })
  }

  /** Выгрузка заказов из GetCourse
   * @param {RequireAtLeastOne<RequestExportDeals>} params Фильтр
   * @returns {ExportApiResponse<ExportInfo>} ID задачи на экспорт
   */
  exportDeals(
    params: RequireAtLeastOne<RequestExportDeals>,
  ): Promise<ExportApiResponse<ExportInfo>> {
    return this.rest.post<ExportApiResponse<ExportInfo>>({
      url: '/pl/api/account/deals',
      query: query(params),
    })
  }

  /** Получение сформированной выгрузки из GetCourse
   * @param {number} export_id ID задачи на экспорт
   * @returns {ExportApiResponse<ExportedData>} Выгруженные данные
   */
  getExportResult(export_id: number): Promise<ExportApiResponse<ExportedData>> {
    return this.rest.post<ExportApiResponse<ExportedData>>({
      url: `/pl/api/account/exports/${export_id}`,
    })
  }
}
