import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

const port = 8000;
app.listen(port, () => {
  console.info('The app is listening on http://localhost:8000')
});
