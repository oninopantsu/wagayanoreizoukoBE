import express from 'express';

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000


app.get('/',(req: express.Request, res: express.Response): void => {
    res.send('Hello World')
});

app.get('/api/sample',(req: express.Request, res: express.Response): void => {
    res.json({
      message: 'Hello, world! GET',
    });
});

app.all('*', (_req: express.Request, res: express.Response): void => {
  res.status(404).json({});
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
