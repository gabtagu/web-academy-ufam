import { Router } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();

router.get('/lorem/:qtd', (req, res) => {
  const qtd = parseInt(req.params.qtd, 10) || 1;
  const lorem = new LoremIpsum();
  const paragraphs = [];

  for (let i = 0; i < qtd; i++) {
    paragraphs.push(lorem.generateParagraphs(1));
  }

  res.render('main/hb1', { paragraphs });
});

export default router;
