export type System = {
  /** Обновлять ли существующего пользователя или заказ */
  refresh_if_exists: 0 | 1;
  /** Email партнера (для пользователя) */
  partner_email?: string;
  /** Добавлять несколько предложений в заказ */
  multiple_offers: 0 | 1;
  /** Возвращать ссылку на оплату */
  return_payment_link: 0 | 1;
  /** Возвращать номер заказа */
  return_deal_number: 0 | 1;
};

export type Deal = Partial<{
  /** Номер заказа */
  deal_number: string;
  /** Уникальный код предложения */
  offer_code: string;
  /** Наименование предложения */
  product_title: string;
  /** Описание предложения */
  product_description: string;
  /** Количество */
  quantity: number;
  /** Сумма заказа */
  deal_cost: string;
  /** Код статуса заказа */
  deal_status: DealStatus;
  /** Оплачен ли заказ */
  deal_is_paid: 1 | 0;
  /** Email менеджера */
  manager_email: string;
  /** Дата cоздания заказа */
  deal_created_at: string;
  /** Дата оплаты/завершения заказа */
  deal_finished_at: string;
  /** Комментарий */
  deal_comment: string;
  /** Тип платежа из списка */
  payment_type: PaymentType;
  /** Статус платежа из списка */
  payment_status: PaymentStatus;
  /** Email партнера (для заказа) */
  partner_email: string;
  /** Дополнительные поля заказа
   * @example {"Доп.поле1":"значение","Доп.поле2":"значение"}
   */
  addfields: { [key: string]: string };
  /** Валюта заказа, если не передан - по умолчанию выбран RUB
   * @default DealCurrency.RUB
   */
  deal_currency: DealCurrency;
}>;

export type User = {
  /** ID пользователя */
  id?: number;
  /** Email пользователя */
  email: string;
  /** Телефон пользователя */
  phone?: string;
  /** Имя пользователя */
  first_name?: string;
  /** Фамилия пользователя */
  last_name?: string;
  /** Город */
  city?: string;
  /** Страна */
  country?: string;
  /** Добавление пользователя в группы
   * @example ['Группа1'] | [["Группа2", "2018-08-01 21:21"]]
   */
  group_name?: (string | [string, string])[];
  /** Дополнительные поля пользователя
   * @example {"Доп.поле1":"значение","Доп.поле2":"значение"}
   */
  addfields?: { [key: string]: string };
};

export type Session = Partial<{
  utm_source: string;
  utm_medium: string;
  utm_content: string;
  utm_campaign: string;
  utm_group: string;
  gcpc: string;
  gcao: string;
  referer: string;
}>;

export type GetCourse = {
  user: User;
  system: System;
  session: Session;
  deal: Deal;
};

export const enum DealStatus {
  New = "new",
  Payed = "payed",
  Cancelled = "cancelled",
  False = "false",
  InWork = "in_work",
  PaymentWaiting = "payment_waiting",
  PartPayed = "part_payed",
  WaitingForReturn = "waiting_for_return",
  NotConfirmed = "not_confirmed",
  Pending = "pending",
}

export const enum PaymentStatus {
  Expected = "expected",
  Accepted = "accepted",
  Returned = "returned",
  ToBalance = "tobalance",
  FromBalance = "frombalance",
  ReturnedToBalance = "returned_to_balance",
}

export const enum PaymentType {
  TwoCheckout = "2CO",
  AlfaBank = "ALFA",
  NonCashPayment = "BILL",
  CreditCard = "CARD",
  CardTerminal = "CARD_TERMINAL",
  Cash = "CASH",
  CloudPayments = "cloud_payments",
  CloudPaymentsKz = "cloud_payments_kz",
  Fondy = "fondy",
  HutkiGrosh = "hutki_grosh",
  Interkassa = "interkassa",
  InternalBalance = "INTERNAL",
  Justclick = "justclick",
  BankReceipt = "kvit",
  Other = "OTHER",
  PayAnyWay = "payanyway",
  Paypal = "PAYPAL",
  PerfectMoney = "perfect_money",
  Qiwi = "QIWI",
  QiwiKassa = "qiwi_kassa",
  QuickTransfer = "QUICKTRANSFER",
  RBKMoney = "RBK",
  RbkMoneyNew = "rbkmoney_new",
  Robokassa = "ROBOKASSA",
  Sberbank = "SBER",
  SberbankAcquiring = "sberbank",
  TinkoffBank = "tinkoff",
  TinkoffCredit = "tinkoffcredit",
  BonusAccount = "VIRTUAL",
  UnitedCashier = "walletone",
  WayForPay = "wayforpay",
  WebMoney = "WEBMONEY",
  YandexKassa = "yandex_kassa",
  YandexMoney = "YANDEXMONEY",
  ZPayment = "ZPAYMENT",
  Prodamus = "prodamus",
  Ebanx = "ebanx",
  Swedbank = "swedbank",
}

export const enum DealCurrency {
  RUB = "RUB",
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  BYR = "BYR",
  BYN = "BYN",
  KZT = "KZT",
  UAH = "UAH",
  AUD = "AUD",
  DKK = "DKK",
  CHF = "CHF",
  SEK = "SEK",
  ZAR = "ZAR",
  AMD = "AMD",
  RON = "RON",
  BRL = "BRL",
  ILS = "ILS",
  MYR = "MYR",
  SGD = "SGD",
  KGS = "KGS",
  CAD = "CAD",
  MXN = "MXN",
  JPY = "JPY",
  UZS = "UZS",
  PLN = "PLN",
  AZN = "AZN",
  AED = "AED",
  TRY = "TRY",
  INR = "INR",
  RSD = "RSD",
  CZK = "CZK",
  MNT = "MNT",
  NZD = "NZD",
}
