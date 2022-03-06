import express from 'express';
import * as DbType from "../types/MysqlType";
import db from '../database';

const router = express.Router();

type Fridge = {
    ingredient_id: number
    place: 'FRIDGE' | 'FREEZER'
    expiry_date?: Date
}

// 取得
router.get('/', (req: express.Request, res: express.Response) => {
    db.query({ sql: 'SELECT * FROM cooking_ingredients', timeout: 60000 }, (err, rows, fields) => {
        if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
            throw new Error('too long to count table rows!');
        }
        if (err) throw err
        res.status(200).json(rows)
    })
})

// 登録と更新
router.post('/:id?', (req: express.Request, res: express.Response) => {
    const paramData: Fridge = req.body;
    const { ingredient_id, place, expiry_date } = paramData;

    // 登録関数
    const createData = () => {
        db.query({
            sql: 'INSERT INTO cooking_ingredients (ingredient_id, place, expiry_date) VALUES (?,?,?)',
            values: [ingredient_id, place, expiry_date],
            timeout: 60000
        }, (err: DbType.QueryError, result: DbType.ResultSetHeader, fields: DbType.FieldPacket[]) => {
            if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                throw new Error('too long to count table rows!');
            }
            if (err) return res.status(500).json({
                error: {
                    message: err.message
                }
            });
            console.log(result.insertId);
            return res.status(200).json({ 'message': '登録完了' })
        })
    }

    // 更新関数
    const updateData = (id: string) => {
        db.query({
            sql: 'UPDATE cooking_ingredients SET ingredient_id = ?, place = ?, expiry_date = ? WHERE id = ?',
            values: [ingredient_id, place, expiry_date, req.params.id],
            timeout: 60000
        }, (err: DbType.QueryError, result: DbType.ResultSetHeader, fields: DbType.FieldPacket[]) => {
            if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                throw new Error('too long to count table rows!');
            }
            if (err) return res.status(500).json({
                error: {
                    message: err.message
                }
            });
            console.log(result.insertId);
            return res.status(200).json({ 'message': '更新完了' })
        })
    }
    // id有無で更新か新規作成かを判断する
    if (!req.params.id) {
        return createData();
    }
    return updateData(req.params.id);
})

// 削除
router.delete('/:id', (req: express.Request, res: express.Response) => {
    db.query({
        sql: 'DELETE FROM cooking_ingredients WHERE id=?',
        values: [req.params.id],
        timeout: 60000
    }, (err: DbType.QueryError, result: DbType.ResultSetHeader, fields: DbType.FieldPacket[]) => {
        if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
            throw new Error('too long to count table rows!');
        }
        if (err) return res.status(500).json({
            error: {
                message: err.message
            }
        });
        return res.status(200).json({ 'message': '削除完了しました' })
    })
})

export default router;