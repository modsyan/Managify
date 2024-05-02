import { CreateUser } from "../requests/user";

export type CreateUserResponse = {
  data: CreateUser;
  message: string;
};
