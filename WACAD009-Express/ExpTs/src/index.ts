import express from 'express';
import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
import logger from './middlewares/logger';
import { engine } from 'express-handlebars';
import router from './router/router';
import productRouter from './router/products';
import helpers from './views/helpers/helpers';
import loremRouter from './router/lorem';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;
const publicPath = '${process.cwd()}/public';
app.use(express.urlencoded({ extended: false }));

app.engine(
  'handlebars',
  engine({
    helpers: helpers,
    layoutsDir: `${__dirname}/views/layout`,
  }),
);

app.use(router);
app.use(productRouter);
app.use(loremRouter);

app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);
app.use(express.static(publicPath));
app.use(logger('simples'));

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta http://localhost:${PORT}`);
});
