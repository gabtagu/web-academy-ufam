// associa as rotas de produtos ao roteador principal da API

import productsRouter from "../resourcers/products/products.router";
import { Router } from "express";
import languagesRouter from "../language/languagesRouter";
import usersRouter from "../users/usersRouter";
import authRouter from "../auth/auth.router";

const router = Router();

router.use("/products", productsRouter);
router.use("/languages", languagesRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);

export default router;
