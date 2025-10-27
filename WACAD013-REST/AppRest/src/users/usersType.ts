import { Users } from "@prisma/client";

export type CreateUserDTO = Pick<Users, "name" | "email" | "password">;
export type UpdateUserDTO = Partial<CreateUserDTO>;
