import express from 'express';
import mysql from 'mysql2';

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000
// const connection = mysql.createConnection(process.env.DATABASE_URL)
// connection.connect()
// app.use(express.json());


app.get('/api/sample',(req: express.Request, res: express.Response): void => {
    // パラメーターを取得
    console.log(req.query);
    res.json({
      message: 'Hello, world! GET',
    });
    // connection.query('SELECT * FROM users', function (err, rows, fields) {
    //   if (err) throw err
  
    //   res.send(rows)
    // })
});

app.all('*', (_req: express.Request, res: express.Response): void => {
  res.status(404).json({});
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
