import { Prisma } from "@prisma/client";
import { UserTypes } from "../userType/userTypes.constants";
import { CreateUserDTO } from "./usersType";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new Prisma.Client();

export async function createUser(createUser: CreateUserDTO) {
  const { password } = createUser;

  const salt = await bcrypt.getSalt(Number(process.env.HASH_SALT_ROUNDS) || 10);
  const hash = await bcrypt.hash(password, salt);

  return prisma.users.create({
    data: {
      ...createUser,
      userTypeId: UserTypes.client,
      password: hash,
    },
  });
}
