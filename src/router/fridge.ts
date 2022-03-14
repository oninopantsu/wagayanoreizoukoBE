import express from 'express';
import * as DbType from "../types/MysqlType";
import db from '../database';
import jsonGetResponse from '../getResponse';
import jsonResponse from '../response';

const router = express.Router();

type Fridge = {
    ingredient_id: number
    place: 'FRIDGE' | 'FREEZER'
    expiry_date?: Date
}

// 取得
router.get('/', (req: express.Request, res: express.Response) => {
  db.query({ sql: 'SELECT * FROM cooking_ingredients', timeout: 60000 }, (err: DbType.QueryError, rows: DbType.RowDataPacket[], fields) => {
    return jsonGetResponse(err, res, rows);
  })
})

// 1件取得
router.get('/:id', (req: express.Request, res: express.Response) => {
  db.query({
    sql: 'SELECT * FROM cooking_ingredients WHERE id=?',
    values: [req.params.id],
    timeout: 60000 }, (err: DbType.QueryError, rows: DbType.RowDataPacket[], fields) => {
    return jsonGetResponse(err, res, rows);
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
      return jsonResponse(err, res, '登録完了');
    })
  }

  // 更新関数
  const updateData = (id: string) => {
    db.query({
      sql: 'UPDATE cooking_ingredients SET ingredient_id = ?, place = ?, expiry_date = ? WHERE id = ?',
      values: [ingredient_id, place, expiry_date, req.params.id],
      timeout: 60000
    }, (err: DbType.QueryError, result: DbType.ResultSetHeader, fields: DbType.FieldPacket[]) => {
      return jsonResponse(err, res, '更新完了');
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
    return jsonResponse(err, res, '削除完了しました');
  })
})

export default router;
