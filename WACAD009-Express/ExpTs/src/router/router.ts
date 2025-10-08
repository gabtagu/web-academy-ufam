import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.send('Hello world! Esta é a página Inicial');
});
router.get('/about', (req, res) => {
  res.send('About page');
});
router.get('/page', (req, res) => {
  res.send(
    '<DOCTYPE html><html><head><title>Minha Página</title></head><body><h1>Conteúdo da minha página</h1></body></html>',
  );
});
router.get('/hb1', (req, res) => {
  res.render('hb1', {
    layout: false,
  });
});
router.get('/hb2', (req, res) => {
  res.render('hb2', {
    layout: false,
  });
});
router.get('/hb3', (req, res) => {
  res.render('hb3', {
    layout: false,
  });
});
export default router;
