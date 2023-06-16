import type { Session, System, User, UserStatus } from '../../typings/entities'

export type RequestAddUser = {
  user: User
  system: Pick<System, 'refresh_if_exists' | 'partner_email'>
  session: Session
}

export type RequestUpdateUserGroups = {
  user: Pick<User, 'id' | 'group_name'>
}

export type ResponseUser = {
  success: boolean
  user_id: number
  user_status: UserStatus
  error_message: string
  error: boolean
}
