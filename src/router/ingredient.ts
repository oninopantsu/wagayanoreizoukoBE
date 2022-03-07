import express from 'express';
import db from '../database';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  db.query({ sql: 'SELECT * FROM ingredients', timeout: 60000 }, (err, rows, fields) => {
    if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
      throw new Error('too long to count table rows!');
    }
    if (err) throw err
    res.status(200).json(rows)
  })
})

export default router;