import express from 'express';
import * as DbType from "../types/MysqlType";
import db from '../database';
import jsonResponse from '../response';
import jsonGetResponse from '../getResponse';

const router = express.Router();

/**
 * 機能一覧
 * 一覧情報取得
 * 詳細情報取得
 * 登録・更新処理
 * 削除処理
 */
router.get('/', (req: express.Request, res: express.Response) => {
    db.query({sql: 'SELECT * FROM memos', timeout: 60000}, (err: DbType.QueryError, rows: DbType.RowDataPacket[], fields) => {
      return jsonGetResponse(err, res, rows);
    })
})

router.get('/:id', (req: express.Request, res: express.Response) => {
    db.query({
      sql: 'SELECT * FROM memos WHERE id=?',
      values: [req.params.id],
      timeout: 60000
    }, (err: DbType.QueryError, rows: DbType.RowDataPacket[], fields) => {
      return jsonGetResponse(err, res, rows);
    })
})

router.post('/:id?', (req: express.Request, res: express.Response) => {
  const contents: string = req.body.contents;
    // 登録関数
    const createData = () => {
      db.query({
          sql: 'INSERT INTO memos (contents) VALUES (?)',
          values: [contents],
          timeout: 60000
      }, (err: DbType.QueryError, result: DbType.ResultSetHeader, fields: DbType.FieldPacket[]) => {
          return jsonResponse(err, res, '登録完了');
      })
    }

    // 更新関数
    const updateData = (id: string) => {
        db.query({
            sql: 'UPDATE memos SET contents = ? WHERE id = ?',
            values: [contents, req.params.id],
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

router.delete('/:id', (req: express.Request, res: express.Response) => {
    db.query({
        sql: 'DELETE FROM memos WHERE id=?',
        values: [req.params.id],
        timeout: 60000
    }, (err: DbType.QueryError, result: DbType.ResultSetHeader, fields: DbType.FieldPacket[]) => {
        return jsonResponse(err, res, '削除完了しました');
    })
})

export default router;
