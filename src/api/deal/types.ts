import type { Deal, Session, System, User, UserStatus } from '../../typings/entities'

export type RequestAddDeal = {
  user: User
  system: System
  session: Session
  deal: Deal
}

export type RequestUpdateDealStatus = {
  user: Pick<User, 'email'>
  deal: Pick<Deal, 'deal_number' | 'deal_status'>
}

export type ResponseDeal = {
  success: boolean
  deal_id: number
  deal_number: number | ''
  user_id: number
  user_status: UserStatus
  error_message: string
  error: boolean
  payment_link: string
}
