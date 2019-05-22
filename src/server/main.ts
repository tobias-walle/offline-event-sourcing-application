import 'babel-polyfill';
import 'express-async-errors';
import { app } from './app';

const port = 8000;
app.listen(port, () => {
  console.info('The app is listening on http://localhost:8000')
});
