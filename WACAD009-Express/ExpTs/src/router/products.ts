import { Router } from 'express';
import productsController from '../controller/products';

const router = Router();

router.get('/products', productsController.index);
router.get('/products/read/:id', productsController.read);
router.all('/products/create', productsController.create);
router.all('/products/update/:id', productsController.update);
router.post('/products/delete/:id', productsController.remove);

export default router;
