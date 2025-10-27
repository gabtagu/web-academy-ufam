// associa as rotas de produtos ao roteador principal da API

import productsRouter from "../resourcers/products/products.router";
import { Router } from "express";
import languagesRouter from "../language/languagesRouter";
import usersRouter from "../users/usersRouter";

const router = Router();

router.use("/products", productsRouter);
router.use("/languages", languagesRouter);
router.use("/users", usersRouter);

export default router;
