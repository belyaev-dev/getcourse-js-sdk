import type { Deal, Session, System, User } from '../../typings/entities'

export type RequestAddDeal = {
  user: User
  system: System
  session: Session
  deal: Deal
}

export type ResponseAddDeal = {}

export type RequestUpdateDealStatus = {
  user: Pick<User, 'email'>
  deal: Pick<Deal, 'deal_number' | 'deal_status'>
}

export type ResponseUpdateDealStatus = {}
