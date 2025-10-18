//responder as requisições do cliente
import { Request, Response } from "express";
//import productsService from "./products.service";
import { CreateProductDTO } from "./products.types";
import {
  createProduct,
  getAllProducts,
  getProduct,
  productAlreadyExists,
} from "./products.service";

const index = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar produtos." });
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await getProduct(id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    } else {
      return res.json(product);
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar produto." });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: CreateProductDTO = req.body;

    if (await productAlreadyExists(product.name)) {
      return res.status(409).json({ message: "Produto já existe." });
    } else {
      const newProduct = await createProduct(product);
      res.status(201).json(newProduct);
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar produto." });
  }
};

const update = (req: Request, res: Response) => {
  res.send("Rota de produtos funcionando!");
};

const remove = (req: Request, res: Response) => {
  res.send("Rota de produtos funcionando!");
};

export default { index, read, create, update, remove };
