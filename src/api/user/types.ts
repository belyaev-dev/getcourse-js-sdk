import type { Session, System, User } from '../../typings/entities'

export interface RequestAddUser {
  user: User
  system: Pick<System, 'refresh_if_exists' | 'partner_email'>
  session: Session
}

export interface ResponseAddUser {}

export interface RequestUpdateUserGroups {
  user: Pick<User, 'id' | 'group_name'>
}

export interface ResponseUpdateUserGroup {}
