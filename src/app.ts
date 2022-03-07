import express from 'express';
import cors from 'cors';
import ingredient from './router/ingredient';
import fridge from './router/fridge';
import memo from './router/memo';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/ingredient', ingredient);
app.use('/api/fridge', fridge);
app.use('/api/memo', memo);

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Hello World!')
});

app.all('*', (_req: express.Request, res: express.Response): void => {
  res.status(404).json({});
});

app.listen(port, () => {
  console.log(`starting server on *:${port}`);
});
