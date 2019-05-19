import bodyParser from 'body-parser';
import express from 'express';
import { rootRouter } from './routes/root-router';

export const app = express();

app.use(bodyParser.json());
app.use('/.netlify/functions/server', rootRouter);
