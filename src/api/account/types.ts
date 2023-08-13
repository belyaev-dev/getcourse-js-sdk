import type {
  DealStatus,
  PaymentStatus,
  UserStatus,
} from '../../typings/entities'

/** Фильтры экспорта пользователей */
export type RequestExportUsers = {
  /** Статус пользователя */
  status?: UserStatus
  /** Дата создания пользователей */
  created_at?: {
    /** @example 2022-11-01 */
    from: string
    /** @example 2022-11-01 */
    to: string
  }
}

/** Фильтры экспорта пользователей */
export type RequestExportGroups = {
  /** Статус пользователя */
  status?: UserStatus
  /** Дата создания пользователей */
  created_at?: {
    /** @example 2022-11-01 */
    from: string
    /** @example 2022-11-01 */
    to: string
  }
}

/** Фильтры экспорта пользователей */
export type RequestExportGroupsUsers = {
  /** Статус пользователя */
  status?: UserStatus
  /** Дата создания пользователей */
  created_at?: {
    /** @example 2022-11-01 */
    from: string
    /** @example 2022-11-01 */
    to: string
  }
  /** Дата добавления в группу */
  added_at?: {
    /** @example 2022-11-01 */
    from: string
    /** @example 2022-11-01 */
    to: string
  }
}

export type RequestExportPayments = {
  /** Статус платежа */
  status?: PaymentStatus
  /** Дата создания платежей */
  created_at?: {
    /** @example 2022-11-01 */
    from: string
    /** @example 2022-11-01 */
    to: string
  }
  /** Дата изменения статуса платежа */
  status_changed_at?: {
    /** @example 2022-11-01 */
    from: string
    /** @example 2022-11-01 */
    to: string
  }
}

export type RequestExportDeals = {
  /** Статус заказа */
  status?: DealStatus
  /** Дата создания заказов */
  created_at?: {
    /** @example 2022-11-01 */
    from: string
    /** @example 2022-11-01 */
    to: string
  }
  /** Дата оплаты заказа */
  payed_at?: {
    /** @example 2022-11-01 */
    from: string
    /** @example 2022-11-01 */
    to: string
  }
  /** Дата завершения заказа */
  finished_at?: {
    /** @example 2022-11-01 */
    from: string
    /** @example 2022-11-01 */
    to: string
  }
  /** Дата изменения статуса заказа */
  status_changed_at?: {
    /** @example 2022-11-01 */
    from: string
    /** @example 2022-11-01 */
    to: string
  }
}

export type ExportInfo = {
  /** ID задачи, по которой можно получить информацию об экспорте */
  export_id: number
}

export type FieldInfo = {
  /** ID поля */
  id: string
  /** Сущность, в которой находится поле */
  context_type: string
  /** Тип поля */
  type: string
  /** Название поля */
  title: string
  /** Обязательность заполнения поля */
  required: string
  /** Порядковый номер поля */
  field_order_pos: string
  /** Настройки поля */
  params: string
}

export type GroupInfo = {
  /** ID группы */
  id: string
  /** Название группы */
  name: string
  /** Дата последнего добавления пользователя в группу */
  last_added_at?: string
}

/**
 * Выгруженные данные
 * Структура данных для каждого объекта соответствует тому, что выгружается в CSV с помощью интерфейса экспорта в соответствующих разделах
 * */
export type ExportedData = {
  /** Оглавление таблицы экспорта */
  fields: string[]
  /** Содержание таблицы экспорта */
  items: (string | number)[][]
}
