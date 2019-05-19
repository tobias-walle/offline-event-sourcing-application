import bodyParser from 'body-parser';
import express from 'express';

export const app = express();

const mainRouter = express.Router();
mainRouter.get('/', (req, res) => {
  res.send('Hello');
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', mainRouter);

