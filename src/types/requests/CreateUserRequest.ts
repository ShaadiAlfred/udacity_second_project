import { User } from "../../database/models/User";

export type CreateUserRequest = Omit<User, "id">;
