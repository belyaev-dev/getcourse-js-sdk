import type { Deal, Session, System, User } from '../../typings/entities'

export interface RequestAddDeal {
  user: User
  system: System
  session: Session
  deal: Deal
}

export interface ResponseAddDeal {}

export interface RequestUpdateDealStatus {
  user: Pick<User, 'email'>
  deal: Pick<Deal, 'deal_number' | 'deal_status'>
}

export interface ResponseUpdateDealStatus {}
