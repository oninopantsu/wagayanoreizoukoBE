import express from 'express';
import db from '../database';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    // db.query('SELECT * FROM ingredients', function (err, rows, fields) {
    //     if (err) throw err
    //     res.json(rows)
    // })
    res.send("食材名を取得するエンドポイント")
})

export default router;