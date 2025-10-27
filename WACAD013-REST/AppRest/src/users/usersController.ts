import { Request, Response } from "express";
import { createUser } from "./usersService";

const index = (req: Request, res: Response) => {
  res.send("Users controller funcionando!");
};

const read = (req: Request, res: Response) => {
  res.send("Users controller funcionando!");
};

const create = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const createdUser = await createUser(user);

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).send("Erro ao criar usuário");
  }
};

const remove = (req: Request, res: Response) => {
  res.send("Users controller funcionando!");
};

const update = (req: Request, res: Response) => {
  res.send("Users controller funcionando!");
};

export default {
  index,
  read,
  create,
  remove,
  update,
};
