import { Request, Response } from 'express';
import axios from 'axios';
import { Product } from '../types/products';

axios.defaults.baseURL = `http://localhost:8000`;

const index = async (req: Request, res: Response) => {
  try {
    const products = (await axios.get('/products')).data;
    res.render('products/index', { products });
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product: Product = (await axios(`/products/${id}`)).data;
  res.render('products/read', { product });
};

const create = async (req: Request, res: Response) => {
  try {
    if (req.method === 'GET') {
      res.render('products/create');
    } else if (req.method === 'POST') {
      const product: Product = req.body;
      await axios.post('/products', product); // <-- await aqui
      res.redirect('/products');
    }
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (req.method === 'GET') {
      const product: Product = (await axios(`/products/${id}`)).data;
      res.render('products/update', { product });
    } else if (req.method === 'POST') {
      const product: Product = req.body;
      await axios.put(`/products/${id}`, product); // <-- await aqui
      res.redirect('/products');
    }
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    await axios.delete(`/products/${req.params.id}`); // <-- await aqui
    res.redirect('/products');
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};

export default { index, create, read, update, remove };
