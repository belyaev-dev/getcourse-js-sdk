import { Session, System, User } from "../../typings/entities";

export type RequestAddUser = {
  user: User;
  system: Pick<System, "refresh_if_exists" | "partner_email">;
  session: Session;
};

export type ResponseAddUser = {};

export type RequestUpdateUserGroups = {
  user: Pick<User, "id" | "group_name">;
};

export type ResponseUpdateUserGroup = {};
