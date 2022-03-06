import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000
const db = mysql.createConnection(process.env.DATABASE_URL || '')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


// データベース接続テスト
app.get('/db-test', (req: express.Request, res: express.Response) => {
  db.query('SELECT * FROM users', function (err, rows, fields) {
    if (err) throw err
    res.send(rows)
  })
})

app.get('/',(req: express.Request, res: express.Response): void => {
    res.send('Hello World!')
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
