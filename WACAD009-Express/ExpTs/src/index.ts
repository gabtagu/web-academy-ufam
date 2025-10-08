import express from 'express';
import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
import logger from './middlewares/logger';
import { engine } from 'express-handlebars';
import router from './router/router';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;
const publicPath = '${process.cwd()}/public';

app.use(router);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);
app.use(express.static(publicPath));
app.use(logger('simples'));

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta http://localhost:${PORT}`);
});
